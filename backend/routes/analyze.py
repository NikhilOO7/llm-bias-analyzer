from fastapi import APIRouter, HTTPException
from schemas.request_response import AnalyzeRequest, AnalyzeResponse, ModelResult
from models.llm_loader import get_model
from services.bias_detector import detect_bias
from db.mongo import get_db

router = APIRouter()

@router.post("/", response_model=AnalyzeResponse)
def analyze_text(request: AnalyzeRequest):
    db = get_db()
    results = []

    print(f"\n📨 Prompt: {request.prompt}")
    print(f"📦 Models requested: {request.model_names}\n")

    for model_name in request.model_names:
        print(f"➡️ Processing model: {model_name}")

        model_info = get_model(model_name)
        if not model_info:
            raise HTTPException(status_code=404, detail=f"Model {model_name} not found")

        pipe = model_info["pipeline"]
        model_type = model_info["type"]
        tokenizer = pipe.tokenizer
        mask_token = tokenizer.mask_token

        # For masked models, make sure we use the correct token
        if model_type == "masked":
            if "[MASK]" not in request.prompt and "<mask>" not in request.prompt:
                raise HTTPException(
                    status_code=400,
                    detail=f"Prompt must include a mask token. Expected '{mask_token}' for model '{model_name}'."
                )

            # Replace generic [MASK] or <mask> with the correct token
            prompt = request.prompt.replace("[MASK]", mask_token).replace("<mask>", mask_token)
            print(f"✅ Normalized prompt for {model_name}: {prompt}")

            output = pipe(prompt)
            predictions = [res["token_str"].strip() for res in output]
        else:
            output = pipe(request.prompt, max_length=50, num_return_sequences=1)
            predictions = [output[0]["generated_text"]]

        bias_flags, sentiment = detect_bias(predictions)
        print(f"🧠 Predictions: {predictions}")
        print(f"⚠️ Bias flags: {bias_flags}")
        print(f"📊 Sentiment: {sentiment}")

        result = ModelResult(
            model=model_name,
            type=model_type,
            top_predictions=predictions,
            bias_flags=bias_flags,
            sentiment=sentiment
        )
        results.append(result)

        db.logs.insert_one({
            "prompt": request.prompt,
            "model": model_name,
            "type": model_type,
            "predictions": predictions,
            "bias_flags": bias_flags,
            "sentiment": sentiment
        })

    print("\n✅ Completed analysis for all models.")
    return AnalyzeResponse(results=results)
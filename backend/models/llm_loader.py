import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from transformers import (
    AutoTokenizer, 
    TFAutoModelForMaskedLM, 
    TFAutoModelForCausalLM, 
    pipeline
)

MODEL_NAMES = {
    "bert-base-uncased": {"type": "masked", "path": "bert-base-uncased"},
    "gpt2": {"type": "causal", "path": "gpt2"},
    "distilbert-base-uncased": {"type": "masked", "path": "distilbert-base-uncased"},
    "roberta-base": {"type": "masked", "path": "roberta-base"},
    "xlm-roberta-base": {"type": "masked", "path": "xlm-roberta-base"}
}

LOADED_MODELS = {}

def load_models():
    print("🔄 Loading models...")
    for name, config in MODEL_NAMES.items():
        print(f"📦 Loading model: {name}")
        tokenizer = AutoTokenizer.from_pretrained(config["path"])
        if config["type"] == "masked":
            model = TFAutoModelForMaskedLM.from_pretrained(config["path"], from_pt=True)
        else:
            model = TFAutoModelForCausalLM.from_pretrained(config["path"], from_pt=True)
        pipe = pipeline("fill-mask" if config["type"] == "masked" else "text-generation",
                        model=model, tokenizer=tokenizer, framework="tf")
        LOADED_MODELS[name] = {
            "pipeline": pipe,
            "type": config["type"]
        }
    print("✅ All models loaded and cached.")

def get_model(name):
    return LOADED_MODELS.get(name)
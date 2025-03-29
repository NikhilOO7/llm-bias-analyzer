from fastapi import APIRouter
from db.mongo import get_db

router = APIRouter()

@router.get("/")
def get_bias_dashboard():
    db = get_db()
    logs = list(db.logs.find({}))

    model_stats = {}

    for log in logs:
        model = log["model"]
        model_stats.setdefault(model, {"total": 0, "biased": 0})
        model_stats[model]["total"] += 1
        if log.get("bias_flags"):
            if len(log["bias_flags"]) > 0:
                model_stats[model]["biased"] += 1

    dashboard_data = []
    for model, stats in model_stats.items():
        total = stats["total"]
        biased = stats["biased"]
        bias_percentage = round((biased / total) * 100, 2) if total else 0.0
        dashboard_data.append({
            "model": model,
            "total_responses": total,
            "biased_responses": biased,
            "bias_percentage": bias_percentage
        })

    return {"dashboard": dashboard_data}
from fastapi import APIRouter
from fastapi.responses import FileResponse
from db.mongo import get_db
from services.report_generator import generate_pdf

router = APIRouter()

@router.get("/")
def get_report():
    db = get_db()
    logs = list(db.logs.find().sort("_id", -1).limit(25))  # latest 25 logs

    for log in logs:
        log["_id"] = str(log["_id"])  # make MongoDB ID serializable

    pdf_path = generate_pdf(logs)
    return FileResponse(pdf_path, media_type="application/pdf", filename="llm_bias_report.pdf")
from fastapi import APIRouter
from models.llm_loader import MODEL_NAMES

router = APIRouter()

@router.get("/")
def list_models():
    return {"models": list(MODEL_NAMES.keys())}
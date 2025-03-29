from pydantic import BaseModel
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    prompt: str
    model_names: List[str]

class ModelResult(BaseModel):
    model: str
    type: str
    top_predictions: List[str]
    bias_flags: List[str]
    sentiment: str

class AnalyzeResponse(BaseModel):
    results: List[ModelResult]
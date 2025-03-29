from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analyze, models, dashboard
from db.mongo import connect_mongo
from models.llm_loader import load_models

app = FastAPI(title="LLM Bias Analyzer", version="1.0")

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB and load models at startup
@app.on_event("startup")
async def startup_event():
    connect_mongo()
    load_models()

# Include all route modules
app.include_router(analyze.router, prefix="/analyze", tags=["Analyze"])
app.include_router(models.router, prefix="/models", tags=["Models"])
# app.include_router(report.router, prefix="/report", tags=["Report"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
# Project: LLM Bias Analyzer Web App

## Summary
A full-stack application built with React.js (frontend) and FastAPI (backend) that allows users to select from multiple Hugging Face models to evaluate bias in LLM outputs. Results are logged to MongoDB, visualized in dashboards, and exportable as PDF reports. The application supports model comparisons, critical analysis, and future options for user-led fine-tuning.

---

## Backend: FastAPI

### Main API (`main.py`)
- Initializes API, loads 5 Hugging Face models
- Registers routes for:
  - `/analyze`: accept prompt and model(s), return output + bias detection
  - `/models`: list available models
  - `/report`: generate downloadable PDF
  - `/dashboard`: fetch analysis data

### Routes
- `routes/analyze.py`: bias detection, keyword check, sentiment analysis
- `routes/report.py`: generate report using WeasyPrint
- `routes/dashboard.py`: fetch and aggregate data for charts
- `routes/models.py`: list available models

### Models Used
- `bert-base-uncased`
- `gpt2`
- `distilbert-base-uncased`
- `roberta-base`
- `xlm-roberta-base`

### MongoDB
- Store prompt, model used, response, analysis (bias type, sentiment, flags)
- Collections: `logs`, `reports`

### Swagger UI
- Automatically generated from FastAPI for documentation

### Backend Folder Structure
```
backend/
├── main.py
├── models/
│   └── llm_loader.py
├── routes/
│   ├── analyze.py
│   ├── models.py
│   ├── report.py
│   └── dashboard.py
├── schemas/
│   └── request_response.py
├── services/
│   ├── bias_detector.py
│   └── report_generator.py
├── db/
│   └── mongo.py
├── templates/
│   └── report_template.html
├── Dockerfile
└── requirements.txt
```

---

## Frontend: React.js + Material UI

### Pages
- `Home`: Model selection, prompt input
- `Analysis`: Display model response + bias annotations
- `Dashboard`: Interactive charts comparing models (Recharts)
- `Reports`: List and download past reports

### Components
- `ModelSelector`: Dropdown for selecting models
- `PromptForm`: Textarea + submit button
- `ResponseCard`: Highlighted model responses
- `BiasChart`: Bar/pie chart showing bias distribution

### Charts
- Recharts used for:
  - Bias count per model
  - Sentiment polarity
  - Word cloud for flagged terms

### Downloadable Reports
- PDF export from backend, styled via HTML template

---

## Docker & DevOps

### Dockerfiles
- Backend:
```dockerfile
FROM python:3.10
WORKDIR /app
COPY ./backend /app
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- Frontend:
```dockerfile
FROM node:18
WORKDIR /app
COPY ./frontend /app
RUN npm install
CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - mongo
    volumes:
      - ./backend:/app
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

---

## Documentation

### README.md
- Overview
- Setup instructions with Docker
- Model usage
- API endpoint documentation
- Screenshots of UI & dashboard
- How to generate and download reports

### Swagger Docs
- Auto-generated at `/docs` when app is running

### Future Features
- Upload user datasets to fine-tune models
- Authentication & user sessions
- Role-based report sharing

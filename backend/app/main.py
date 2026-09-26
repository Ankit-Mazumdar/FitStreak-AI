from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database import engine
from app.routes.auth import router as auth_router

app = FastAPI(
    title="FitStreak AI API",
    description="AI-powered adaptive fitness platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "FitStreak AI Backend is running!"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/db-test")
def database_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1")).fetchone()
        return {"database": "connected", "status": "success"}
    except Exception as e:
        return {"database": "connection failed", "error": str(e)}
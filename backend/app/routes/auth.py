from datetime import datetime, timedelta
import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from jose import jwt
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

SECRET_KEY = "fitstreak-development-secret"
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()

    if not user or not bcrypt.checkpw(login_data.password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }
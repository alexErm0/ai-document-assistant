from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database.db import get_db, SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.schemas.user_schema import UserLogin
from app.utils.jwt_handler import create_access_token

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register(user:UserCreate, db:Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }
@router.post("/login")
def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db:Session = Depends(get_db)):

    db_user = db.query(User).filter(User.username == form_data.username).first()

    if not db_user:
        return {"error": "Invalid email"}

    if not pwd_context.verify(form_data.password, db_user.password):
        return {"error": "Invalid password"}
    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
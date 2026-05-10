from fastapi import  APIRouter, Depends
from pydantic import BaseModel
from openai import OpenAI
from pyexpat.errors import messages
from  sqlalchemy.orm import Session

from app.config import OPENAI_API_KEY
from app.database.db import SessionLocal
from app.models.user import User

router = APIRouter()

client = OpenAI(api_key=OPENAI_API_KEY)

class AnalyzeRequest(BaseModel):
    text: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/analyze")
def analyze(
        data: AnalyzeRequest,
        db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.username =="testuser").first()

    if not user.is_admin:

        if user.daily_requests >= 5:
            return {"error": "Daily limit reached"}

        user.daily_requests += 1

        db.commit()

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an AI assistant that analyzes documents "
                    "and creates concise summaries."
                )
            },
            {
                "role": "user",
                "content": data.text
            }
        ]
    )

    summary = response.choices[0].message.content
    return {"summary": summary}
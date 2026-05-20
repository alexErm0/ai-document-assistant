from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.document import Document
from app.models.user import User
from app.utils.jwt_handler import get_current_user

router = APIRouter()

@router.get("/history")
def get_history(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    documents = (
        db.query(Document)
        .filter(Document.user_id == current_user.id)
        .order_by(Document.created_at.desc())
        .all()
    )
    return documents
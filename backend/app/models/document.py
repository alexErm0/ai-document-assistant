from sqlalchemy import Column, Integer, String, Text, ForeignKey,DateTime
from sqlalchemy.sql import func

from app.database.db import Base

class Document(Base):

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    content = Column(Text)

    summary = Column(Text)

    user_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
from sqlalchemy import Column, Integer, String, Boolean
from app.database.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)

    is_admin = Column(Boolean, default=False)
    daily_requests = Column(Integer, default=0)
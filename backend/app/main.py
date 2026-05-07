from fastapi import FastAPI

from app.database.db import engine
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router

app = FastAPI()

User.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(upload_router)


@app.get("/")
def root():
    return {"message": "AI Document Assistant API is running"}
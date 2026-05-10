from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = "super_secret_key"
ALGORITHM = "HS256"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
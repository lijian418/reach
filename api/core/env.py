import sys

from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class DBSettings(BaseSettings):
    MONGODB_URL: str = None
    MOTOR_TO_LIST_LIMIT: int = sys.maxsize


class Settings(BaseSettings):
    db: DBSettings = DBSettings()

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

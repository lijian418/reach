import sys

from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class DBSettings(BaseSettings):
    MONGODB_URL: str = None
    MOTOR_TO_LIST_LIMIT: int = sys.maxsize


class RabbitMQSettings(BaseSettings):
    RABBIT_MQ_URL: str = None
    RABBIT_MQ_QUEUE_NAME: str = None
    RABBIT_MQ_MODE: str = None


class Settings(BaseSettings):
    db: DBSettings = DBSettings()
    queue: RabbitMQSettings = RabbitMQSettings()

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

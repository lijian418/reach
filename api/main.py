import pydantic
from bson import ObjectId
from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from core.env import settings
from core.queue.factory import QueueClientFactory
from routes.main_router import main_router

root_router = APIRouter()
app = FastAPI(title="Reach API")
pydantic.json.ENCODERS_BY_TYPE[ObjectId] = str


@root_router.get("/", status_code=200)
def root():
    return JSONResponse(content={"response": "OK"})


app.include_router(main_router)
app.include_router(root_router)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

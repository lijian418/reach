from fastapi import APIRouter
from routes.endpoints.alert_endpoint import router as alert_endpoints_router
from routes.endpoints.channel import router as channel_router
from routes.endpoints.message import router as message_router
from routes.endpoints.user import router as user_router

main_router = APIRouter()

main_router.include_router(alert_endpoints_router, prefix="/alert-endpoints", tags=["alert-endpoints"])
main_router.include_router(channel_router, prefix="/channels", tags=["channels"])
main_router.include_router(message_router, prefix="/messages", tags=["messages"])
main_router.include_router(user_router, prefix="/users", tags=["users"])

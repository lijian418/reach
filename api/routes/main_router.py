from fastapi import APIRouter
from routes.endpoints.destination import router as destinations_router
from routes.endpoints.alert_rule import router as alert_rules_router
from routes.endpoints.channel import router as channel_router
from routes.endpoints.message import router as message_router
from routes.endpoints.user import router as user_router

main_router = APIRouter()

main_router.include_router(destinations_router, prefix="/destinations", tags=["destinations"])
main_router.include_router(alert_rules_router, prefix="/alert-rules", tags=["alert-rules"])
main_router.include_router(channel_router, prefix="/channels", tags=["channels"])
main_router.include_router(message_router, prefix="/messages", tags=["messages"])
main_router.include_router(user_router, prefix="/users", tags=["users"])

from fastapi import APIRouter
from routes.endpoints.alert_route import router as alert_router
from routes.endpoints.channel import router as channel_router
from routes.endpoints.message import router as message_router
from routes.endpoints.subscription import router as subscription_router
from routes.endpoints.tag import router as tag_router
from routes.endpoints.user import router as user_router

main_router = APIRouter()

main_router.include_router(alert_router, prefix="/alerts", tags=["alerts"])
main_router.include_router(channel_router, prefix="/channels", tags=["channels"])
main_router.include_router(message_router, prefix="/messages", tags=["messages"])
main_router.include_router(subscription_router, prefix="/subscriptions", tags=["subscriptions"])
main_router.include_router(tag_router, prefix="/tags", tags=["tags"])
main_router.include_router(user_router, prefix="/users", tags=["users"])

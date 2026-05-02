from fastapi import APIRouter

from app.api.routes.admin import router as admin_router
from app.api.routes.admin_blogs import router as admin_blogs_router
from app.api.routes.admin_images import router as admin_images_router
from app.api.routes.admin_offers import router as admin_offers_router
from app.api.routes.appointments import router as appointments_router
from app.api.routes.auth import router as auth_router
from app.api.routes.calculator_settings import router as calculator_settings_router
from app.api.routes.cities import router as cities_router
from app.api.routes.health import router as health_router
from app.api.routes.leads import router as leads_router
from app.api.routes.public import router as public_router
from app.api.routes.quotes import router as quotes_router
from app.api.routes.user_dashboard import router as user_dashboard_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(calculator_settings_router)
api_router.include_router(appointments_router)
api_router.include_router(health_router)
api_router.include_router(cities_router)
api_router.include_router(leads_router)
api_router.include_router(admin_router)
api_router.include_router(admin_blogs_router)
api_router.include_router(admin_images_router)
api_router.include_router(admin_offers_router)
api_router.include_router(quotes_router)
api_router.include_router(user_dashboard_router)
api_router.include_router(public_router)

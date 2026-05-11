from contextlib import asynccontextmanager
import asyncio
import logging
from pathlib import Path
import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.routes import api_router
from app.core.config import settings
from app.core.cors import add_cors_middleware
from app.db import init_db

logger = logging.getLogger(__name__)

# Determine writable uploads directory. Prefer `UPLOAD_DIR` env var, then project `uploads`.
default_upload = Path(__file__).resolve().parent.parent / "uploads"
upload_env = os.getenv("UPLOAD_DIR")
if upload_env:
    UPLOAD_DIR = Path(upload_env)
else:
    UPLOAD_DIR = default_upload
try:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    # Serverless environments often have a read-only file system. Fallback to /tmp/uploads.
    UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "/tmp/uploads"))
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan handler.

    To avoid blocking startup on long-running DB migrations in constrained
    environments (e.g. Render free instances), run `init_db()` in a
    background thread unless explicitly disabled via `RUN_MIGRATIONS=false`.
    """
    run_migrations = os.getenv("RUN_MIGRATIONS", "true").lower() in ("1", "true", "yes")
    if run_migrations:
        try:
            logger.info("Scheduling database initialization in background thread")
            asyncio.create_task(asyncio.to_thread(init_db))
        except Exception:
            # Fallback to synchronous init if background scheduling fails
            logger.exception("Background DB init failed; running synchronously")
            init_db()
    else:
        logger.info("Skipping database initialization (RUN_MIGRATIONS=false)")

    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.api_prefix}/openapi.json",
    lifespan=lifespan,
)

add_cors_middleware(app)
app.include_router(api_router, prefix=settings.api_prefix)

# Serve uploaded images at /uploads/<filename>
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
# Compatibility alias for deployments/frontends that request /api/uploads/<filename>
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="api-uploads")


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "message": f"{settings.app_name} is running",
        "version": settings.app_version,
    }


@app.get("/api")
async def api_root() -> dict[str, str]:
    return {
        "message": f"{settings.app_name} API is running",
        "version": settings.app_version,
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

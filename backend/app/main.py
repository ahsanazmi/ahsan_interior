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
from app.db import ensure_compatibility_schema, init_db

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

    Ensures critical schema compatibility runs synchronously before app starts,
    then schedules full DB init in background to avoid blocking startup.
    """
    run_migrations = os.getenv("RUN_MIGRATIONS", "true").lower() in ("1", "true", "yes")
    if run_migrations:
        try:
            # CRITICAL: Run schema compatibility synchronously before accepting requests
            logger.info("Running schema compatibility check (synchronous)...")
            ensure_compatibility_schema()
            logger.info("✓ Schema compatibility check completed")
            
            # Schedule full DB init in background to avoid blocking startup
            logger.info("Scheduling full database initialization in background")
            asyncio.create_task(asyncio.to_thread(init_db))
        except Exception:
            logger.exception("Critical: Schema compatibility check failed!")
            raise  # Prevent app from starting if schema migration fails
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

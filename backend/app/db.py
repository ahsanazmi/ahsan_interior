from collections.abc import Generator
import os

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


class Base(DeclarativeBase):
    pass


_database_url = settings.database_url
# Some hosted providers (Neon, Heroku, etc.) provide DATABASE_URL as
# `postgres://...` or `postgresql://...`. SQLAlchemy will try to load the
# `psycopg2` DBAPI for plain `postgresql://`. We use psycopg (psycopg3), so
# normalize common prefixes to `postgresql+psycopg://` to avoid
# ModuleNotFoundError: No module named 'psycopg2'
if _database_url.startswith("postgres://"):
    _database_url = _database_url.replace("postgres://", "postgresql+psycopg://", 1)
elif _database_url.startswith("postgresql://") and "+psycopg" not in _database_url:
    _database_url = _database_url.replace("postgresql://", "postgresql+psycopg://", 1)

_pool_size = int(os.getenv("DB_POOL_SIZE", "5"))
_max_overflow = int(os.getenv("DB_MAX_OVERFLOW", "10"))

engine = create_engine(
    _database_url,
    pool_pre_ping=True,
    pool_size=_pool_size,
    max_overflow=_max_overflow,
    future=True,
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def ensure_compatibility_schema() -> None:
    """Apply lightweight schema fixes needed by newer app versions.
    
    This ensures the leads table has query_type and message columns.
    Runs synchronously at startup to ensure columns exist before first request.
    """
    import logging
    logger = logging.getLogger(__name__)
    
    try:
        inspector = inspect(engine)
        if not inspector.has_table("leads"):
            logger.info("leads table does not exist yet; will be created by init_db")
            return

        # Check if columns already exist
        columns = {col['name'] for col in inspector.get_columns("leads")}
        needs_query_type = 'query_type' not in columns
        needs_message = 'message' not in columns
        
        if not (needs_query_type or needs_message):
            logger.info("leads table already has query_type and message columns")
            return
        
        logger.info(f"Adding missing columns to leads table: query_type={needs_query_type}, message={needs_message}")
        
        with engine.begin() as connection:
            if needs_query_type:
                logger.debug("Adding query_type column...")
                connection.execute(
                    text(
                        """
                        ALTER TABLE leads
                        ADD COLUMN IF NOT EXISTS query_type VARCHAR(120) NOT NULL DEFAULT 'General query'
                        """
                    )
                )
                logger.debug("query_type column added successfully")
                
            if needs_message:
                logger.debug("Adding message column...")
                connection.execute(
                    text(
                        """
                        ALTER TABLE leads
                        ADD COLUMN IF NOT EXISTS message VARCHAR(2000) NULL
                        """
                    )
                )
                logger.debug("message column added successfully")
        
        logger.info("Schema compatibility check completed successfully")
    except Exception as e:
        logger.error(f"Failed to ensure schema compatibility: {e}", exc_info=True)
        raise


def init_db() -> None:
    from app.models import (  # noqa
        account_otp,
        appointment,
        blog,
        calculator,
        image,
        lead,
        marketing_campaign,
        offer,
        price_calculation,
        quote,
        user,
    )

    Base.metadata.create_all(bind=engine)
    ensure_compatibility_schema()

@echo off
REM Docker Compose Quick Start Script for Windows
REM Usage: docker-start.bat

echo.
echo Starting Interior Design App with Docker Compose...
echo.

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo # Database
        echo POSTGRES_USER=postgres
        echo POSTGRES_PASSWORD=postgres
        echo POSTGRES_DB=interior_db
        echo.
        echo # Backend
        echo DATABASE_URL=postgresql://postgres:postgres@db:5432/interior_db
        echo ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=your-email@gmail.com
        echo SMTP_PASSWORD=your-app-password
        echo MAIL_FROM=your-email@gmail.com
        echo META_VERIFY_TOKEN=your-meta-verify-token
        echo META_ACCESS_TOKEN=your-meta-access-token
        echo.
        echo # Frontend
        echo VITE_API_BASE_URL=http://localhost:10000/api
    ) > .env
    echo .env created. Update it with your credentials!
)

echo.
echo Building Docker images...
docker-compose build --no-cache

echo.
echo Starting services...
docker-compose up -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak

echo.
echo ===== Services started! =====
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:10000
echo Backend Docs: http://localhost:10000/docs
echo Database: localhost:5432
echo.
echo View logs:
echo   docker-compose logs -f
echo.
echo Stop services:
echo   docker-compose down

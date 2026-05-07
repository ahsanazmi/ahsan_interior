#!/bin/bash

# Docker Compose Quick Start Script
# Usage: ./docker-start.sh

set -e

echo "🐳 Starting Interior Design App with Docker Compose..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cat > .env << EOF
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=interior_db

# Backend
DATABASE_URL=postgresql://postgres:postgres@db:5432/interior_db
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
META_VERIFY_TOKEN=your-meta-verify-token
META_ACCESS_TOKEN=your-meta-access-token

# Frontend
VITE_API_BASE_URL=http://localhost:10000/api
EOF
    echo -e "${GREEN}✅ .env created. Update it with your credentials!${NC}"
fi

# Build and start services
echo -e "${BLUE}Building Docker images...${NC}"
docker-compose build --no-cache

echo -e "${BLUE}Starting services...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${BLUE}Waiting for services to start...${NC}"
sleep 10

# Get service status
echo -e "${GREEN}✅ Services started!${NC}"
echo ""
echo -e "${GREEN}URLs:${NC}"
echo -e "  Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend:  ${BLUE}http://localhost:10000${NC}"
echo -e "  Backend Docs: ${BLUE}http://localhost:10000/docs${NC}"
echo -e "  Database: ${BLUE}localhost:5432${NC}"
echo ""
echo -e "${GREEN}View logs:${NC}"
echo "  docker-compose logs -f"
echo ""
echo -e "${GREEN}Stop services:${NC}"
echo "  docker-compose down"

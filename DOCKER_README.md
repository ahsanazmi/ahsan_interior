# Docker & AWS Deployment Guide

This directory contains everything needed to deploy the Interior Design app using Docker and AWS.

## Files Included

- `Dockerfile` — Backend and frontend container images
- `docker-compose.yml` — Local development with PostgreSQL
- `docker-start.sh` — Quick start script (Linux/Mac)
- `docker-start.bat` — Quick start script (Windows)
- `AWS_DEPLOYMENT_GUIDE.md` — Complete AWS deployment instructions

## Quick Start (Local)

### Mac/Linux
```bash
chmod +x docker-start.sh
./docker-start.sh
```

### Windows
```bash
docker-start.bat
```

Then visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:10000
- API Docs: http://localhost:10000/docs

## Manual Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove data
docker-compose down -v
```

## Build Individual Images

### Backend
```bash
cd backend
docker build -t interior-backend:latest .
docker run -p 10000:10000 \
  -e DATABASE_URL=postgresql://user:pass@localhost/db \
  interior-backend:latest
```

### Frontend
```bash
cd dream-home-design
docker build -t interior-frontend:latest .
docker run -p 3000:3000 \
  -e VITE_API_BASE_URL=http://localhost:10000/api \
  interior-frontend:latest
```

## AWS Deployment

See `AWS_DEPLOYMENT_GUIDE.md` for detailed instructions on deploying to:
- AWS App Runner (easiest)
- AWS ECS + Fargate (recommended)
- AWS EC2 + Docker Compose (most control)

## Environment Variables

### Backend
- `DATABASE_URL` — PostgreSQL connection string
- `ALLOWED_ORIGINS` — Comma-separated list of allowed frontend URLs
- `SMTP_HOST` — Email SMTP host (e.g., smtp.gmail.com)
- `SMTP_PORT` — Email SMTP port (usually 587)
- `SMTP_USER` — Email username
- `SMTP_PASSWORD` — Email password
- `MAIL_FROM` — From email address
- `META_VERIFY_TOKEN` — Meta webhook verification token
- `META_ACCESS_TOKEN` — Meta Graph API access token

### Frontend
- `VITE_API_BASE_URL` — Backend API URL (e.g., http://localhost:10000/api)

## Production Checklist

Before deploying to production:

- [ ] Update `ALLOWED_ORIGINS` to include production frontend URL
- [ ] Set `VITE_API_BASE_URL` to production backend URL
- [ ] Ensure `DATABASE_URL` points to production RDS instance
- [ ] Configure SMTP credentials with a production email account
- [ ] Set Meta webhook tokens in backend environment
- [ ] Enable HTTPS on frontend and backend (AWS ALB, CloudFront, etc.)
- [ ] Configure backup strategy for RDS database
- [ ] Set up CloudWatch monitoring and alerts
- [ ] Enable auto-scaling for ECS services
- [ ] Test health checks work: `GET /health` on backend

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or stop Docker services
docker-compose down
```

### Database Connection Error
```bash
# Check database is running
docker-compose ps

# View database logs
docker-compose logs db

# Manually test connection
psql postgresql://postgres:postgres@localhost:5432/interior_db
```

### API Calls Failing from Frontend
1. Check `ALLOWED_ORIGINS` in backend .env
2. Verify `VITE_API_BASE_URL` is correct
3. Check browser DevTools Network tab for CORS errors
4. Check backend is responding: `curl http://localhost:10000/api/health`

### Images Not Rebuilding
```bash
# Force rebuild without cache
docker-compose build --no-cache

# Remove unused images
docker image prune -a
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS App Runner](https://aws.amazon.com/apprunner/)
- [AWS ECS](https://aws.amazon.com/ecs/)
- [AWS RDS](https://aws.amazon.com/rds/)

## Support

For issues or questions, check:
1. Backend logs: `docker-compose logs backend`
2. Frontend logs: `docker-compose logs frontend`
3. Database logs: `docker-compose logs db`

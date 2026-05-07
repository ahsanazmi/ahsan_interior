# AWS Deployment Guide — Docker

This guide walks you through deploying the Interior Design app (FastAPI backend + React frontend) on AWS using Docker.

## Option 1: AWS App Runner (Easiest for beginners)

AWS App Runner automatically builds and deploys Docker images. It's the simplest option.

### Prerequisites
- AWS Account with permissions for App Runner, ECR, and IAM
- AWS CLI installed and configured (`aws configure`)

### Step 1: Push Docker Images to ECR

Create ECR repositories and push your images:

```bash
# Set variables
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=us-east-1  # Change to your region
IMAGE_NAME_BACKEND=interior-backend
IMAGE_NAME_FRONTEND=interior-frontend

# Create ECR repositories
aws ecr create-repository --repository-name $IMAGE_NAME_BACKEND --region $AWS_REGION
aws ecr create-repository --repository-name $IMAGE_NAME_FRONTEND --region $AWS_REGION

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build and tag backend
cd backend
docker build -t $IMAGE_NAME_BACKEND:latest .
docker tag $IMAGE_NAME_BACKEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_BACKEND:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_BACKEND:latest

# Build and tag frontend
cd ../dream-home-design
docker build -t $IMAGE_NAME_FRONTEND:latest .
docker tag $IMAGE_NAME_FRONTEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_FRONTEND:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_FRONTEND:latest
```

### Step 2: Deploy Backend with App Runner

```bash
# Via AWS CLI
aws apprunner create-service \
  --service-name interior-backend \
  --source-configuration \
    ImageRepository="{ImageRepositoryType=ECR,ImageIdentifier=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_BACKEND:latest}" \
  --instance-configuration Cpu=1024,Memory=2048 \
  --region $AWS_REGION

# Then manually add environment variables in AWS Console:
# - DATABASE_URL (RDS connection string)
# - ALLOWED_ORIGINS
# - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, MAIL_FROM
# - META_VERIFY_TOKEN, META_ACCESS_TOKEN
```

### Step 3: Deploy Frontend with App Runner

Update VITE_API_BASE_URL to point to your backend App Runner URL, then deploy:

```bash
# Update .env and rebuild
echo "VITE_API_BASE_URL=https://interior-backend-xxxxx.region.apprunner.amazonaws.com/api" > dream-home-design/.env.production

# Rebuild and push
cd dream-home-design
docker build -t $IMAGE_NAME_FRONTEND:latest .
docker tag $IMAGE_NAME_FRONTEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_FRONTEND:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME_FRONTEND:latest

# Deploy with App Runner via CLI or AWS Console
```

---

## Option 2: AWS ECS + Fargate (Recommended for production)

ECS Fargate is more powerful and scalable than App Runner.

### Step 1: Create RDS Database

```bash
aws rds create-db-instance \
  --db-instance-identifier interior-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password "YourSecurePassword" \
  --allocated-storage 20 \
  --storage-type gp2 \
  --publicly-accessible \
  --region $AWS_REGION
```

### Step 2: Push Images to ECR (same as Option 1)

```bash
# Follow the ECR steps from Option 1
```

### Step 3: Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name interior-cluster --region $AWS_REGION
```

### Step 4: Create Task Definitions

**Backend Task Definition:**

Create a file `backend-task-def.json`:

```json
{
  "family": "interior-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/interior-backend:latest",
      "portMappings": [
        {
          "containerPort": 10000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DATABASE_URL",
          "value": "postgresql://user:pass@interior-db.xxx.rds.amazonaws.com:5432/interior_db"
        },
        {
          "name": "ALLOWED_ORIGINS",
          "value": "https://your-frontend-domain.com"
        },
        {
          "name": "SMTP_HOST",
          "value": "smtp.gmail.com"
        },
        {
          "name": "SMTP_PORT",
          "value": "587"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/interior-backend",
          "awslogs-region": "REGION",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ],
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole"
}
```

Register the task definition:

```bash
aws ecs register-task-definition --cli-input-json file://backend-task-def.json --region $AWS_REGION
```

**Frontend Task Definition:** (similar, but port 3000 and VITE_API_BASE_URL)

### Step 5: Create Services and Load Balancers

Create an Application Load Balancer (ALB) in the AWS Console, then create ECS services that point to it.

```bash
aws ecs create-service \
  --cluster interior-cluster \
  --service-name interior-backend-service \
  --task-definition interior-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=backend,containerPort=10000 \
  --region $AWS_REGION
```

---

## Option 3: AWS EC2 with Docker Compose (Most control)

Cheapest option; good for small/medium apps.

### Step 1: Launch an EC2 Instance

```bash
# Via AWS Console:
# - AMI: Ubuntu 22.04 LTS
# - Instance type: t3.small or t3.medium
# - Security Group: Allow ports 80, 443, 10000, 3000
# - Key pair: Create or select a key
```

### Step 2: SSH into the Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 3: Install Docker

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo usermod -aG docker $USER
newgrp docker
```

### Step 4: Clone Your Repository

```bash
git clone https://github.com/your-repo/Interior_Client.git
cd Interior_Client
```

### Step 5: Create `.env` File

```bash
cat > .env << EOF
# Backend
DATABASE_URL=postgresql://user:password@db:5432/interior_db
ALLOWED_ORIGINS=https://your-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
META_VERIFY_TOKEN=your-meta-token
META_ACCESS_TOKEN=your-meta-access-token

# Frontend
VITE_API_BASE_URL=https://api.your-domain.com/api
EOF
```

### Step 6: Use Nginx as Reverse Proxy

Create `nginx.conf`:

```nginx
upstream backend {
    server backend:10000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    # API endpoints → backend
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 7: Start with Docker Compose

```bash
docker-compose -f docker-compose.yml up -d
```

Check logs:

```bash
docker-compose logs -f
```

---

## Common Issues & Fixes

### 1. Database Connection Fails
- Ensure `DATABASE_URL` is correct
- Check security group allows port 5432
- Test: `psql postgresql://user:pass@host/db`

### 2. API Calls Fail from Frontend
- Check `ALLOWED_ORIGINS` includes frontend URL
- Verify `VITE_API_BASE_URL` points to correct backend
- Check CORS headers in browser DevTools

### 3. Docker Build Fails
- Ensure `requirements.txt` and `package.json` are in correct paths
- Run `docker build` locally first to debug
- Check `.dockerignore` isn't excluding needed files

### 4. Port Already in Use
```bash
# Kill the process using the port
lsof -i :3000  # Find process
kill -9 <PID>
```

---

## SSL/TLS Certificate (Let's Encrypt)

For HTTPS on EC2:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --standalone -d your-domain.com
# Certificates saved to: /etc/letsencrypt/live/your-domain.com/
```

Update `nginx.conf` with the certificate paths, then restart nginx.

---

## Monitoring & Logs

### View Docker Logs
```bash
docker-compose logs backend -f
docker-compose logs frontend -f
```

### AWS CloudWatch
- App Runner / ECS logs are automatically sent to CloudWatch
- Check `/ecs/interior-backend` and `/ecs/interior-frontend` log groups

---

## Summary of Recommended Path

**For quick start:** Option 1 (App Runner) — no infrastructure setup
**For production:** Option 2 (ECS Fargate) — scalable, managed
**For cost & control:** Option 3 (EC2 + Docker Compose) — simple, full control

Let me know which option you prefer and I can help with any specific AWS setup!

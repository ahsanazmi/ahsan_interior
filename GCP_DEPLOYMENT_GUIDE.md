# GCP Cloud Run Deployment Guide

This guide covers deploying the Interior Design backend to Google Cloud Platform using Cloud Run, Cloud SQL, and Cloud Build.

## Overview

- **Compute**: Cloud Run (serverless, auto-scaling, pay-per-use)
- **Database**: Cloud SQL (managed PostgreSQL)
- **Container Registry**: Artifact Registry
- **CI/CD**: Cloud Build
- **DNS**: Cloud DNS or managed by your domain provider

## Prerequisites

1. **GCP Account** with billing enabled
2. **gcloud CLI** installed and configured
3. **Docker** installed locally (for testing)
4. **Project ID**: `export PROJECT_ID="your-gcp-project-id"`

## Step 1: Set Up GCP Project

```bash
# Set your project ID
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"  # Change as needed

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable \
    run.googleapis.com \
    sqladmin.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    containerregistry.googleapis.com \
    compute.googleapis.com \
    servicenetworking.googleapis.com

# Create Artifact Registry repository
gcloud artifacts repositories create interior-backend \
    --repository-format=docker \
    --location=$REGION \
    --description="Interior Design Backend"
```

## Step 2: Set Up Cloud SQL (PostgreSQL)

```bash
# Create Cloud SQL instance (PostgreSQL 15)
gcloud sql instances create interior-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=$REGION \
    --no-backup \
    --availability-type=REGIONAL \
    --enable-bin-log

# Create database
gcloud sql databases create interior_db \
    --instance=interior-db

# Create user
gcloud sql users create admin \
    --instance=interior-db \
    --password=YOUR_SECURE_PASSWORD

# Get the public IP (if not using private IP)
gcloud sql instances describe interior-db \
    --format='get(ipAddresses[0].ipAddress)'
```

## Step 3: Build and Push Container to Artifact Registry

```bash
# Configure Docker to push to Artifact Registry
gcloud auth configure-docker $REGION-docker.pkg.dev

# Build using the GCP Dockerfile
cd backend
docker build -f Dockerfile.gcp \
    -t $REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest .

# Push to Artifact Registry
docker push $REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest

# Or use Cloud Build for automated builds
gcloud builds submit --region=$REGION \
    -f cloudbuild.yaml \
    --substitutions=_REGION=$REGION,_SERVICE_NAME=interior-backend
```

## Step 4: Create Cloud Run Service

```bash
# Get Cloud SQL connection name
export CLOUD_SQL_CONNECTION=$(gcloud sql instances describe interior-db \
    --format='get(connectionName)')

# Deploy to Cloud Run
gcloud run deploy interior-backend \
    --image=$REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest \
    --platform=managed \
    --region=$REGION \
    --allow-unauthenticated \
    --set-env-vars=\
"DATABASE_URL=postgresql://admin:YOUR_PASSWORD@/interior_db?host=/cloudsql/$CLOUD_SQL_CONNECTION,\
RUN_MIGRATIONS=true,\
ALLOWED_ORIGINS=https://your-frontend-url.com,\
SECRET_KEY=$(openssl rand -hex 32),\
EMAIL_PROVIDER=smtp,\
SMTP_HOST=smtp.gmail.com,\
SMTP_PORT=587,\
SMTP_USER=your-email@gmail.com,\
SMTP_PASSWORD=your-app-password,\
MAIL_FROM=noreply@your-company.com" \
    --memory=512Mi \
    --cpu=1 \
    --timeout=60 \
    --max-instances=10 \
    --min-instances=1 \
    --add-cloudsql-instances=$CLOUD_SQL_CONNECTION \
    --vpc-connector=interior-vpc-connector \
    --ingress=all \
    --execution-environment=gen2

# Get the service URL
gcloud run services describe interior-backend \
    --region=$REGION \
    --format='get(status.url)'
```

## Step 5: Set Up VPC Connector (for Cloud SQL Private IP)

```bash
# Create VPC connector for Cloud Run to access Cloud SQL
gcloud compute networks vpc-access connectors create interior-vpc-connector \
    --region=$REGION \
    --subnet=default \
    --min-instances=2 \
    --max-instances=10

# Wait for connector to be ready (2-5 minutes)
gcloud compute networks vpc-access connectors describe interior-vpc-connector \
    --region=$REGION
```

## Step 6: Set Up Cloud Build CI/CD

Create `cloudbuild.yaml` in the backend directory:

```yaml
steps:
  # Step 1: Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-f'
      - 'Dockerfile.gcp'
      - '-t'
      - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/interior-backend/app:${SHORT_SHA}'
      - '-t'
      - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/interior-backend/app:latest'
      - '.'

  # Step 2: Push to Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/interior-backend/app:${SHORT_SHA}'

  # Step 3: Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/run'
    args:
      - 'deploy'
      - 'interior-backend'
      - '--image'
      - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/interior-backend/app:${SHORT_SHA}'
      - '--region'
      - '${_REGION}'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--add-cloudsql-instances'
      - '${_CLOUD_SQL_CONNECTION}'
      - '--set-env-vars'
      - 'DATABASE_URL=${_DATABASE_URL},RUN_MIGRATIONS=true,ALLOWED_ORIGINS=${_ALLOWED_ORIGINS},SECRET_KEY=${_SECRET_KEY},EMAIL_PROVIDER=${_EMAIL_PROVIDER}'

images:
  - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/interior-backend/app:${SHORT_SHA}'
  - '${_REGION}-docker.pkg.dev/${PROJECT_ID}/interior-backend/app:latest'

substitutions:
  _REGION: 'us-central1'
  _SERVICE_NAME: 'interior-backend'
  _CLOUD_SQL_CONNECTION: 'your-project:region:instance-name'
  _DATABASE_URL: 'postgresql://admin:password@/interior_db?host=/cloudsql/your-project:region:instance-name'
  _ALLOWED_ORIGINS: 'https://your-frontend-url.com'
  _SECRET_KEY: 'your-secret-key'
  _EMAIL_PROVIDER: 'smtp'

options:
  logging: CLOUD_LOGGING_ONLY
  machineType: 'N1_HIGHCPU_8'

timeout: '1800s'
```

## Step 7: Enable Cloud Build GitHub Integration (Optional)

```bash
# Connect your GitHub repo to Cloud Build
gcloud builds connect --repository-name=Interior_Client \
    --repository-owner=your-github-username \
    --region=$REGION

# Create Cloud Build trigger
gcloud builds triggers create github \
    --name=interior-backend-deploy \
    --repo-name=Interior_Client \
    --repo-owner=your-github-username \
    --branch-pattern=^main$ \
    --build-config=backend/cloudbuild.yaml \
    --region=$REGION
```

## Step 8: Environment Variables for Cloud Run

Set these as secrets in Cloud Run:

```bash
# Create Secret Manager secrets (recommended for sensitive data)
echo -n "postgresql://admin:PASSWORD@/interior_db?host=/cloudsql/$CLOUD_SQL_CONNECTION" | \
    gcloud secrets create DATABASE_URL --data-file=-

echo -n "your-secure-secret-key" | \
    gcloud secrets create SECRET_KEY --data-file=-

echo -n "your-app-specific-password" | \
    gcloud secrets create SMTP_PASSWORD --data-file=-

# Reference secrets in Cloud Run deployment
gcloud run deploy interior-backend \
    --update-secrets=DATABASE_URL=DATABASE_URL:latest,\
SECRET_KEY=SECRET_KEY:latest,\
SMTP_PASSWORD=SMTP_PASSWORD:latest
```

## Step 9: Set Up Custom Domain

```bash
# Map a custom domain to Cloud Run
gcloud run domain-mappings create \
    --service=interior-backend \
    --domain=api.your-domain.com \
    --region=$REGION

# Update DNS records (check output for DNS configuration)
gcloud run domain-mappings describe api.your-domain.com --region=$REGION
```

## Step 10: Run Migrations

```bash
# Migrations run automatically if RUN_MIGRATIONS=true
# Or run manually using Cloud SQL Proxy:

# Download Cloud SQL Proxy
curl -o cloud-sql-proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64
chmod +x cloud-sql-proxy

# Start proxy in background
./cloud-sql-proxy $CLOUD_SQL_CONNECTION &

# Run migrations with psql
psql "postgresql://admin:PASSWORD@localhost/interior_db" < migrations/add_price_to_quotes.sql

# Kill proxy
pkill cloud-sql-proxy
```

## Monitoring and Logs

```bash
# View Cloud Run logs
gcloud run logs read interior-backend --region=$REGION --limit=50

# View real-time logs
gcloud run logs read interior-backend --region=$REGION --limit=50 --follow

# Monitor metrics in Cloud Console
# https://console.cloud.google.com/run/detail/$REGION/interior-backend

# Set up alerts in Cloud Monitoring
gcloud alpha monitoring policies create \
    --notification-channels=YOUR_CHANNEL_ID \
    --display-name="Interior Backend Error Rate" \
    --condition-display-name="High error rate" \
    --condition-threshold-value=0.05 \
    --condition-threshold-duration=300s
```

## Scaling Configuration

```bash
# Update scaling settings
gcloud run services update interior-backend \
    --region=$REGION \
    --min-instances=1 \
    --max-instances=50 \
    --memory=512Mi \
    --cpu=1 \
    --concurrency=80

# View current settings
gcloud run services describe interior-backend --region=$REGION --format=yaml
```

## Database Backups

```bash
# Enable automated backups
gcloud sql backups create \
    --instance=interior-db \
    --description="Manual backup"

# List backups
gcloud sql backups list --instance=interior-db

# Restore from backup
gcloud sql backups restore BACKUP_ID \
    --backup-instance=interior-db \
    --backup-configuration=backup-config
```

## Troubleshooting

### Cloud Run Service Won't Start

```bash
# Check logs
gcloud run logs read interior-backend --region=$REGION --limit=100

# Common issues:
# 1. Database connection string incorrect
# 2. Cloud SQL connection not configured
# 3. Environment variables missing
# 4. PORT not set to 8080
```

### Cloud SQL Connection Timeout

```bash
# Verify Cloud SQL instance is running
gcloud sql instances describe interior-db

# Check firewall rules
gcloud compute firewall-rules list --filter="name~'cloud-sql'"

# Test connection
gcloud sql connect interior-db --user=admin
```

### Permission Denied Errors

```bash
# Grant Cloud Run service account access to Cloud SQL
gcloud projects get-iam-policy $PROJECT_ID

# Add required roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com \
    --role=roles/cloudsql.client
```

## Cost Estimation

- **Cloud Run**: ~$0.20/million requests + compute time
- **Cloud SQL (db-f1-micro)**: ~$9/month
- **Artifact Registry**: ~$0.10/GB storage
- **Cloud Build**: Free tier includes 120 build-minutes/day

## Production Checklist

- [ ] Set up Cloud SQL backup schedule
- [ ] Configure Cloud Monitoring alerts
- [ ] Enable VPC connector for private database access
- [ ] Set up Cloud CDN for static assets
- [ ] Configure custom domain with SSL/TLS
- [ ] Enable Cloud Armor for DDoS protection
- [ ] Set up log aggregation (Cloud Logging)
- [ ] Configure automated Cloud Build triggers
- [ ] Document rollback procedures
- [ ] Test disaster recovery plan

## Useful Commands

```bash
# Restart service
gcloud run deploy interior-backend \
    --image=$REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest \
    --region=$REGION

# Delete service
gcloud run services delete interior-backend --region=$REGION

# Check service status
gcloud run services describe interior-backend --region=$REGION

# Get service URL
gcloud run services describe interior-backend --region=$REGION \
    --format='get(status.url)'
```

## References

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud SQL Best Practices](https://cloud.google.com/sql/docs/postgres/best-practices)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Artifact Registry](https://cloud.google.com/artifact-registry)

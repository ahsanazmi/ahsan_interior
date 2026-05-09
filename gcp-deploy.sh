#!/bin/bash

# ───────────────────────────────────────────────────────────────
# GCP Cloud Run Deployment Quick Start Script
# ───────────────────────────────────────────────────────────────
# This script automates the initial GCP deployment setup

set -e

echo "════════════════════════════════════════════════════════════"
echo "  Interior Design Backend - GCP Cloud Run Setup"
echo "════════════════════════════════════════════════════════════"

# ───────────────────────────────────────────────────────────────
# 1. Validate prerequisites
# ───────────────────────────────────────────────────────────────
echo ""
echo "1️⃣  Checking prerequisites..."

if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install it first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Prerequisites satisfied"

# ───────────────────────────────────────────────────────────────
# 2. Get configuration from user
# ───────────────────────────────────────────────────────────────
echo ""
echo "2️⃣  Configuration"

read -p "Enter your GCP Project ID: " PROJECT_ID
read -p "Enter deployment region [us-central1]: " REGION
REGION=${REGION:-us-central1}

read -p "Enter frontend domain URL: " FRONTEND_URL
read -p "Enter email (SMTP) address: " SMTP_USER
read -s -p "Enter SMTP app password: " SMTP_PASSWORD
echo ""
read -s -p "Enter database password: " DB_PASSWORD
echo ""

# Generate secret key
SECRET_KEY=$(openssl rand -hex 32)

echo ""
echo "Configuration Summary:"
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Frontend URL: $FRONTEND_URL"
echo "  SMTP User: $SMTP_USER"

# ───────────────────────────────────────────────────────────────
# 3. Set up GCP project
# ───────────────────────────────────────────────────────────────
echo ""
echo "3️⃣  Setting up GCP project..."

gcloud config set project $PROJECT_ID

echo "   Enabling required APIs..."
gcloud services enable \
    run.googleapis.com \
    sqladmin.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    containerregistry.googleapis.com \
    compute.googleapis.com \
    servicenetworking.googleapis.com \
    --quiet

echo "✅ GCP project configured"

# ───────────────────────────────────────────────────────────────
# 4. Create Artifact Registry
# ───────────────────────────────────────────────────────────────
echo ""
echo "4️⃣  Creating Artifact Registry repository..."

gcloud artifacts repositories create interior-backend \
    --repository-format=docker \
    --location=$REGION \
    --description="Interior Design Backend" \
    --quiet || echo "   Repository already exists"

echo "✅ Artifact Registry ready"

# ───────────────────────────────────────────────────────────────
# 5. Create Cloud SQL Instance
# ───────────────────────────────────────────────────────────────
echo ""
echo "5️⃣  Creating Cloud SQL PostgreSQL instance..."

if gcloud sql instances describe interior-db --quiet &>/dev/null; then
    echo "   ℹ️  Cloud SQL instance already exists"
else
    gcloud sql instances create interior-db \
        --database-version=POSTGRES_15 \
        --tier=db-f1-micro \
        --region=$REGION \
        --no-backup \
        --availability-type=ZONAL \
        --enable-bin-log \
        --quiet

    # Create database
    gcloud sql databases create interior_db \
        --instance=interior-db \
        --quiet

    # Create user
    gcloud sql users create admin \
        --instance=interior-db \
        --password=$DB_PASSWORD \
        --quiet

    echo "✅ Cloud SQL instance created"
fi

# Get Cloud SQL connection name
CLOUD_SQL_CONNECTION=$(gcloud sql instances describe interior-db \
    --format='get(connectionName)')
echo "   Connection name: $CLOUD_SQL_CONNECTION"

# ───────────────────────────────────────────────────────────────
# 6. Create VPC Connector
# ───────────────────────────────────────────────────────────────
echo ""
echo "6️⃣  Creating VPC connector..."

if gcloud compute networks vpc-access connectors describe interior-vpc-connector \
    --region=$REGION --quiet &>/dev/null; then
    echo "   ℹ️  VPC connector already exists"
else
    gcloud compute networks vpc-access connectors create interior-vpc-connector \
        --region=$REGION \
        --subnet=default \
        --min-instances=2 \
        --max-instances=10 \
        --quiet

    echo "   ⏳ Waiting for VPC connector to be ready (this may take 5-10 minutes)..."
    gcloud compute networks vpc-access connectors describe interior-vpc-connector \
        --region=$REGION \
        --format="value(state)" \
        --quiet
fi

echo "✅ VPC connector configured"

# ───────────────────────────────────────────────────────────────
# 7. Build and push Docker image
# ───────────────────────────────────────────────────────────────
echo ""
echo "7️⃣  Building and pushing Docker image..."

# Configure Docker auth
gcloud auth configure-docker $REGION-docker.pkg.dev --quiet

# Build image
echo "   Building image (this may take 5-10 minutes)..."
docker build -f Dockerfile.gcp \
    -t $REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest \
    ./backend

# Push image
echo "   Pushing to Artifact Registry..."
docker push $REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest

echo "✅ Docker image built and pushed"

# ───────────────────────────────────────────────────────────────
# 8. Create Cloud Run Service
# ───────────────────────────────────────────────────────────────
echo ""
echo "8️⃣  Deploying to Cloud Run..."

DATABASE_URL="postgresql://admin:$DB_PASSWORD@/interior_db?host=/cloudsql/$CLOUD_SQL_CONNECTION"

gcloud run deploy interior-backend \
    --image=$REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest \
    --platform=managed \
    --region=$REGION \
    --allow-unauthenticated \
    --set-env-vars=\
"DATABASE_URL=$DATABASE_URL,\
RUN_MIGRATIONS=true,\
ALLOWED_ORIGINS=$FRONTEND_URL,\
SECRET_KEY=$SECRET_KEY,\
EMAIL_PROVIDER=smtp,\
SMTP_HOST=smtp.gmail.com,\
SMTP_PORT=587,\
SMTP_USER=$SMTP_USER,\
MAIL_FROM=noreply@your-company.com" \
    --set-secrets=SMTP_PASSWORD=SMTP_PASSWORD:latest \
    --memory=512Mi \
    --cpu=1 \
    --timeout=60 \
    --max-instances=10 \
    --min-instances=1 \
    --add-cloudsql-instances=$CLOUD_SQL_CONNECTION \
    --vpc-connector=interior-vpc-connector \
    --ingress=all \
    --execution-environment=gen2 \
    --quiet

echo "✅ Cloud Run service deployed"

# ───────────────────────────────────────────────────────────────
# 9. Get service URL
# ───────────────────────────────────────────────────────────────
echo ""
echo "9️⃣  Getting service details..."

SERVICE_URL=$(gcloud run services describe interior-backend \
    --region=$REGION \
    --format='get(status.url)')

echo "✅ Deployment complete!"

# ───────────────────────────────────────────────────────────────
# 10. Display summary
# ───────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════════════════"
echo "  ✅ Deployment Summary"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Backend URL:        $SERVICE_URL"
echo "Project ID:         $PROJECT_ID"
echo "Region:             $REGION"
echo "Cloud SQL:          $CLOUD_SQL_CONNECTION"
echo "VPC Connector:      interior-vpc-connector"
echo "Service Account:    $PROJECT_ID@appspot.gserviceaccount.com"
echo ""
echo "Next steps:"
echo "  1. Update your frontend's API_BASE_URL to: $SERVICE_URL"
echo "  2. Set up custom domain: gcloud run domain-mappings create --service=interior-backend --domain=api.your-domain.com --region=$REGION"
echo "  3. View logs: gcloud run logs read interior-backend --region=$REGION --limit=50"
echo "  4. Monitor: https://console.cloud.google.com/run/detail/$REGION/interior-backend"
echo ""
echo "To store SMTP password as a secret:"
echo "  echo -n '$SMTP_PASSWORD' | gcloud secrets create SMTP_PASSWORD --data-file=-"
echo ""
echo "════════════════════════════════════════════════════════════"

# GCP Cloud Run Deployment - Quick Reference

## 📋 Files Included

- **Dockerfile.gcp** - GCP-optimized multi-stage Docker build (non-root user, health checks, Cloud Run optimizations)
- **cloudbuild.yaml** - Cloud Build CI/CD pipeline configuration
- **docker-compose.gcp.yml** - Local testing environment that simulates Cloud SQL and Cloud Run
- **gcp-deploy.sh** - Automated deployment script (interactive)
- **.env.gcp.example** - Environment variables template
- **GCP_DEPLOYMENT_GUIDE.md** - Complete deployment guide with detailed instructions

## 🚀 Quick Start (3 Methods)

### Method 1: Automated Deployment (Recommended)

```bash
# Make script executable
chmod +x gcp-deploy.sh

# Run deployment wizard
./gcp-deploy.sh
```

This script will:
- ✅ Validate gcloud and Docker are installed
- ✅ Set up GCP project and enable APIs
- ✅ Create Artifact Registry
- ✅ Create Cloud SQL instance and database
- ✅ Create VPC connector
- ✅ Build and push Docker image
- ✅ Deploy to Cloud Run

### Method 2: Manual Deployment (With Control)

See full instructions in [GCP_DEPLOYMENT_GUIDE.md](GCP_DEPLOYMENT_GUIDE.md)

Quick commands:
```bash
# Set variables
export PROJECT_ID="your-project"
export REGION="us-central1"

# Enable APIs
gcloud services enable run.googleapis.com sqladmin.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# Build and deploy
gcloud run deploy interior-backend \
    --image=$REGION-docker.pkg.dev/$PROJECT_ID/interior-backend/app:latest \
    --region=$REGION \
    --allow-unauthenticated

# Get URL
gcloud run services describe interior-backend --region=$REGION --format='get(status.url)'
```

### Method 3: Local Testing with Docker Compose

Test locally before deploying to GCP:

```bash
# Create .env file from example
cp backend/.env.gcp.example backend/.env.gcp

# Edit with your settings
nano backend/.env.gcp

# Start services
docker-compose -f docker-compose.gcp.yml up -d

# Check if backend is running
curl http://localhost:8080/api/health

# View logs
docker-compose -f docker-compose.gcp.yml logs -f backend

# Stop services
docker-compose -f docker-compose.gcp.yml down
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  GCP Console                        │
├─────────────────────────────────────────────────────┤
│  Cloud Run (interior-backend)                       │
│  ├─ Auto-scaling: 1-10 instances                   │
│  ├─ Memory: 512MB per instance                      │
│  ├─ Timeout: 60 seconds                             │
│  └─ Health check: /api/health every 30s            │
├─────────────────────────────────────────────────────┤
│  Cloud SQL (PostgreSQL 15)                          │
│  ├─ Instance: db-f1-micro                           │
│  ├─ Database: interior_db                           │
│  ├─ Private IP via VPC Connector                   │
│  └─ Automated backups                              │
├─────────────────────────────────────────────────────┤
│  VPC Connector (interior-vpc-connector)             │
│  └─ Secure connection to Cloud SQL                 │
├─────────────────────────────────────────────────────┤
│  Artifact Registry (interior-backend repo)          │
│  └─ Docker image storage and versioning            │
├─────────────────────────────────────────────────────┤
│  Cloud Build (CI/CD)                                │
│  └─ Automated builds on git push                   │
└─────────────────────────────────────────────────────┘
```

## 🔧 Configuration

### Environment Variables

Required for Cloud Run:
```
DATABASE_URL              - PostgreSQL connection string
PORT                      - Must be 8080 for Cloud Run
SECRET_KEY                - App secret (generate with openssl rand -hex 32)
ALLOWED_ORIGINS          - Comma-separated CORS origins
EMAIL_PROVIDER            - "smtp" or "resend"
```

Optional:
```
SMTP_HOST                 - SMTP server hostname
SMTP_PORT                 - SMTP port (typically 587 for TLS)
SMTP_USER                 - Email address
SMTP_PASSWORD             - App-specific password (store as Secret Manager secret)
MAIL_FROM                 - Reply-from email address
```

### Setting Secrets in Cloud Run

```bash
# Create Secret Manager secrets
echo -n "your-password" | gcloud secrets create SMTP_PASSWORD --data-file=-

# Add to Cloud Run deployment
gcloud run deploy interior-backend \
    --set-secrets=SMTP_PASSWORD=SMTP_PASSWORD:latest
```

## 📊 Monitoring

### View Logs

```bash
# Real-time logs
gcloud run logs read interior-backend --region=us-central1 --follow

# Last 100 lines
gcloud run logs read interior-backend --region=us-central1 --limit=100

# Stream to file
gcloud run logs read interior-backend --region=us-central1 --follow > backend.log
```

### Cloud Console

- **Metrics**: https://console.cloud.google.com/run/detail/[REGION]/interior-backend
- **Logs**: https://console.cloud.google.com/logs/query
- **Cloud SQL**: https://console.cloud.google.com/sql/instances
- **Build History**: https://console.cloud.google.com/cloud-build/builds

## 🔄 CI/CD with Cloud Build

### Setup GitHub Integration

```bash
# Connect repo
gcloud builds connect \
    --repository-name=Interior_Client \
    --repository-owner=your-github-username \
    --region=us-central1

# Create trigger for main branch
gcloud builds triggers create github \
    --name=interior-backend-deploy \
    --repo-name=Interior_Client \
    --branch-pattern=^main$ \
    --build-config=backend/cloudbuild.yaml
```

Commits to `main` branch will now:
1. Build Docker image
2. Push to Artifact Registry
3. Deploy to Cloud Run
4. Run smoke tests

## 💰 Cost Estimation

**Monthly approximate costs:**

| Service | Cost | Notes |
|---------|------|-------|
| Cloud Run | $0.10-2 | Depends on traffic (~$0.20 per million requests + compute) |
| Cloud SQL | $9 | db-f1-micro (smallest tier) |
| Artifact Registry | $0.10 | Storage for Docker images |
| Cloud Build | Free | 120 free build-minutes/day |
| VPC Connector | ~$7 | Always-on connector |
| **Total** | **~$16-24** | Based on minimal traffic |

*Costs scale with traffic and storage.*

## 🐛 Troubleshooting

### Container won't start

```bash
# Check logs
gcloud run logs read interior-backend --region=us-central1 --limit=50

# Common issues:
# 1. DATABASE_URL incorrect format
# 2. SMTP_PASSWORD not set as secret
# 3. PORT env var not 8080
# 4. Health check endpoint returns non-200 status
```

### Cloud SQL connection timeout

```bash
# Verify instance is running
gcloud sql instances describe interior-db

# Check VPC connector status
gcloud compute networks vpc-access connectors describe interior-vpc-connector

# Test connection with Cloud SQL Proxy
./cloud-sql-proxy your-project:us-central1:interior-db
```

### Permission denied for Cloud SQL

```bash
# Grant roles to Cloud Run service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com \
    --role=roles/cloudsql.client
```

### High memory usage

```bash
# Scale memory and CPU
gcloud run services update interior-backend \
    --region=us-central1 \
    --memory=1Gi \
    --cpu=2
```

## 📚 Useful Commands

```bash
# Restart service
gcloud run services update-traffic interior-backend \
    --region=us-central1 --to-revisions=LATEST=100

# View service details
gcloud run services describe interior-backend --region=us-central1

# Get service URL
gcloud run services describe interior-backend \
    --region=us-central1 \
    --format='get(status.url)'

# Delete service (careful!)
gcloud run services delete interior-backend --region=us-central1

# Update environment variable
gcloud run services update interior-backend \
    --region=us-central1 \
    --update-env-vars=KEY=VALUE

# Scale instances
gcloud run services update interior-backend \
    --region=us-central1 \
    --min-instances=2 \
    --max-instances=50
```

## 🔗 Resources

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Cloud SQL Best Practices](https://cloud.google.com/sql/docs/postgres/best-practices)
- [gcloud CLI Reference](https://cloud.google.com/sdk/gcloud/reference)
- [Cloud Build Configuration](https://cloud.google.com/build/docs/building/configuring-builds/build-configuration)
- [VPC Connector Setup](https://cloud.google.com/run/docs/configuring/vpc-connectors)

## ❓ FAQ

**Q: What happens if Cloud Run scales to 0?**
A: Cloud Run doesn't scale to 0 with min-instances=1 (set in our config). Each request takes ~1-2 seconds to respond.

**Q: Can I use custom domain?**
A: Yes, use Cloud Domains or map existing domain via Cloud DNS.

**Q: How do I rollback a bad deployment?**
A: Each Cloud Run revision is immutable. Deploy previous image or use `--revision` flag.

**Q: Where are uploaded files stored?**
A: Mounted volumes don't persist in Cloud Run. Use Cloud Storage instead (not yet configured).

**Q: How do I set up automatic backups?**
A: Cloud SQL backups are managed via Cloud Console or `gcloud sql backups` commands.

## 📞 Support

For issues:
1. Check [GCP_DEPLOYMENT_GUIDE.md](GCP_DEPLOYMENT_GUIDE.md) troubleshooting section
2. View logs: `gcloud run logs read interior-backend`
3. Check Cloud Console: https://console.cloud.google.com
4. Open issue with error message and output from `gcloud run logs read`

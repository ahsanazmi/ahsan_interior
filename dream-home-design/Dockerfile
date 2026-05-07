# ── Stage 1: Build ──
FROM node:22-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (use npm install instead of ci for flexibility)
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# ── Stage 2: Production ──
FROM node:22-alpine

WORKDIR /app

# Install serve to serve the built app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]

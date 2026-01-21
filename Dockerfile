# 1. Base Image: Use "slim" (Debian) instead of "alpine" for better compatibility
FROM node:20-slim AS base

# 2. Builder Stage
FROM base AS builder
# Install build tools using apt-get (Debian) instead of apk (Alpine)
# openssl is often needed for database clients like Prisma
RUN apt-get update && apt-get install -y openssl python3 make g++ gcc
WORKDIR /app

# Enable Corepack
RUN corepack enable

# --- COPY PHASE ---
COPY package.json package-lock.json* turbo.json ./

COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/mobile/package.json ./apps/mobile/package.json
COPY packages ./packages

# Install dependencies
# Added --legacy-peer-deps to prevent crashes if React Native versions conflict
RUN npm install --legacy-peer-deps

# Copy source code
COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend
# Note: We deliberately DO NOT copy apps/mobile source code

# Build
RUN npx turbo run build --filter=backend --filter=frontend

# 3. Runner Stage
FROM base AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set production environment
ENV NODE_ENV=production

# --- ARRANGE FOLDERS ---
# 1. Copy Backend
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# 2. Copy Frontend
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist

# 3. Copy Dependencies
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
USER nextjs

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "apps/backend/dist/index.js"]
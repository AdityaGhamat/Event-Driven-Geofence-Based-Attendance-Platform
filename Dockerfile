# 1. Base Image (Alpine is fine if we remove native mobile deps)
FROM node:20-alpine AS base

# 2. Builder Stage
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Corepack
RUN corepack enable

# --- COPY PHASE ---
# Copy root configs
COPY package.json turbo.json ./

# Copy ONLY the web packages
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages ./packages

# 🛑 CRITICAL FIX: DO NOT COPY apps/mobile/package.json
# We want Docker to think the mobile app doesn't exist.

# --- INSTALL PHASE ---
# 1. Delete package-lock.json (It contains mobile refs that break Linux)
# 2. Run npm install (Generates a clean, web-only dependency tree)
RUN rm -f package-lock.json && npm install

# Copy source code (Only Web)
COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend
# Note: apps/mobile is explicitly ignored here too

# Build
RUN npx turbo run build --filter=backend --filter=frontend

# 3. Runner Stage
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ENV NODE_ENV=production

# --- ARRANGE FOLDERS ---
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist

# Copy the fresh node_modules (which now only have web deps)
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["node", "apps/backend/dist/index.js"]
# 1. Base Image
FROM node:20-alpine AS base

# 2. Builder Stage (Builds Frontend & Backend)
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Corepack (if you use pnpm or yarn, otherwise npm is fine)
RUN corepack enable

# --- COPY PHASE ---
# We copy the root configs
COPY package.json package-lock.json* turbo.json ./

# We copy the package.json for all workspaces so npm install works
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
# We copy mobile package.json just to satisfy workspace definitions, but we won't build it
COPY apps/mobile/package.json ./apps/mobile/package.json
COPY packages ./packages

# Install ALL dependencies (including dev deps needed for building)
RUN npm install

# Copy the full source code for backend and frontend
COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend
# Note: We deliberately DO NOT copy apps/mobile source code

# --- BUILD PHASE ---
# Use Turbo to build only the backend and frontend
# This generates:
# - apps/backend/dist
# - apps/frontend/dist
RUN npx turbo run build --filter=backend --filter=frontend

# 3. Runner Stage (The final tiny image)
FROM base AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set production environment
ENV NODE_ENV=production

# --- ARRANGE FOLDERS ---
# Your code does: path.resolve(__dirname, "../../frontend/dist")
# So we must recreate that specific folder structure inside the container.

# 1. Copy the backend built files
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# 2. Copy the frontend built files (so the backend can find them)
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist

# 3. Copy production dependencies
# Ideally we would prune devDependencies here, but copying node_modules from builder is safest for a starter
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
USER nextjs

# Expose the port
EXPOSE 3000

# Start the server
# We point directly to the index.js we just copied
CMD ["node", "apps/backend/dist/index.js"]
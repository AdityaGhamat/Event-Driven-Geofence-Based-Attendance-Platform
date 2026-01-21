FROM node:20-alpine AS base

# 2. Builder Stage
FROM base AS builder
# --- FIX: Add build tools for native dependencies (bcrypt, sharp, etc.) ---
RUN apk add --no-cache libc6-compat python3 make g++ 
WORKDIR /app

# Enable Corepack
RUN corepack enable

# --- COPY PHASE ---
COPY package.json package-lock.json* turbo.json ./

COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/mobile/package.json ./apps/mobile/package.json
COPY packages ./packages

# Install dependencies (This should pass now)
RUN npm install

# Copy source code
COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend
# Note: We deliberately DO NOT copy apps/mobile source code

# Build
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
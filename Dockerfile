
FROM node:20-alpine AS base


FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app


RUN corepack enable

COPY package.json turbo.json ./


COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages ./packages
RUN rm -f package-lock.json && npm install


COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend



RUN npx turbo run build --filter=backend --filter=frontend


FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ENV NODE_ENV=production


COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist


COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["node", "apps/backend/dist/app.js"]
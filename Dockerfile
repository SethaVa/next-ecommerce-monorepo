# ───────────────────────────────────────────
# Stage 1: Install ALL dependencies
# ───────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# ───────────────────────────────────────────
# Stage 2: Build the target service
# ───────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

ARG SERVICE
ENV SERVICE=${SERVICE}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN ./node_modules/.bin/nest build ${SERVICE}

RUN find /app/dist -name "main.js" && echo "--- dist structure ---" && find /app/dist -type f
# ───────────────────────────────────────────
# Stage 3: Lean production image
# ───────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ARG SERVICE
ENV SERVICE=${SERVICE}
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/package*.json ./

# ✅ Copy compiled output — without webpack, nest outputs to dist/apps/<service>
COPY --from=builder /app/dist/apps/${SERVICE} ./dist

# ✅ Required for prisma migrate deploy at runtime
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# ✅ Without webpack, entry point is at dist/src/main.js
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
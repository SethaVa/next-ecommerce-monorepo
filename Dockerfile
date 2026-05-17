# ───────────────────────────────────────────
# Stage 1: Install ALL dependencies
# ───────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
# Install everything (including devDeps needed to build)
RUN npm ci

# ───────────────────────────────────────────
# Stage 2: Build the target service
# ───────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Which service to build — passed at build time
ARG SERVICE
ENV SERVICE=${SERVICE}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx nest build ${SERVICE}

# ───────────────────────────────────────────
# Stage 3: Lean production image
# ───────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ARG SERVICE
ENV SERVICE=${SERVICE}
ENV NODE_ENV=production

# Copy production node_modules directly from deps stage
# instead of running npm ci again
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy only the compiled output for this service
COPY --from=builder /app/dist/apps/${SERVICE} ./dist

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/main"]
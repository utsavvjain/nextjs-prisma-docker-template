# Stage 1: Dependencies
FROM public.ecr.aws/zomato/node:20.19.5-alpine-amd64 AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy package files only first to leverage cache
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Stage 2: Builder
FROM public.ecr.aws/zomato/node:20.19.5-alpine-amd64 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure prisma directory exists to prevent COPY errors later
RUN mkdir -p prisma

# Generate Prisma client only if schema exists
#RUN if [ -f ./prisma/schema.prisma ]; then \
#    npx prisma generate --schema=./prisma/schema.prisma; \
#    fi

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# Stage 3: Runner
FROM public.ecr.aws/zomato/node:20.19.5-alpine-amd64 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install production dependencies
RUN apk add --no-cache mysql-client libc6-compat

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Create start script with conditional Prisma push
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'if [ -f ./prisma/schema.prisma ]; then' >> /app/start.sh && \
    echo '  (echo "Running Prisma DB push..." && npx prisma db push --accept-data-loss --force-reset) &' >> /app/start.sh && \
    echo 'fi' >> /app/start.sh && \
    echo 'echo "Starting application..."' >> /app/start.sh && \
    echo 'npm start' >> /app/start.sh && \
    chmod +x /app/start.sh

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["/app/start.sh"]

FROM node:24-alpine AS builder

WORKDIR /app

# Copy root configurations (if using monorepo)
COPY package.json package-lock.json ./
# Or assuming building strictly in sub-directory
COPY apps/smartops-api/package.json ./apps/smartops-api/

# Install dependencies based on root level
RUN npm install

# Copy source
COPY apps/smartops-api/ ./apps/smartops-api/

WORKDIR /app/apps/smartops-api
# Build Prisma schema and NestJS App
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=builder /app/apps/smartops-api/package.json ./apps/smartops-api/
RUN npm install --omit=dev

COPY --from=builder /app/apps/smartops-api/dist ./apps/smartops-api/dist
COPY --from=builder /app/apps/smartops-api/prisma ./apps/smartops-api/prisma

WORKDIR /app/apps/smartops-api

CMD ["npm", "run", "start:prod"]

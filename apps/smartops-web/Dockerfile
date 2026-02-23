FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/smartops-web/package.json ./apps/smartops-web/
RUN npm install

COPY apps/smartops-web/ ./apps/smartops-web/

WORKDIR /app/apps/smartops-web
RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app/apps/smartops-web

COPY --from=builder /app/apps/smartops-web/public ./public
COPY --from=builder /app/apps/smartops-web/.next/standalone ./
COPY --from=builder /app/apps/smartops-web/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

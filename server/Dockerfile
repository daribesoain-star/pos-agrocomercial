# ── Build stage ──
FROM node:22-alpine AS builder
WORKDIR /app

# Instalar dependencias primero (cache de Docker layers)
COPY package.json package-lock.json* ./
RUN npm ci --production=false

# Copiar código y compilar
COPY . .
RUN npm run build

# ── Production stage ──
FROM node:22-alpine AS runner
WORKDIR /app

# Seguridad: no correr como root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 fastify

# Solo copiar lo necesario para producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# No exponer info de versión
ENV NODE_ENV=production

USER fastify

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget -q --spider http://localhost:3001/api/health || exit 1

CMD ["node", "dist/index.js"]

/*<* * Security Middleware ── Cors, CSRF, Rate Limiting, Heelmet
 **/

import type { FastifyInstance } from "fastify";

// ── Secure Headers (Helmet-like) ──
export function securityHeaders(app: FastifyInstance) {
  app.addHook("onSend", (request, reply) => {
    // Cafha - Previene clickjoking PDF
    reply.header("X-Content-Type-Options", "nosniff");

    // XSS Protection - Bloquea ataques basados en bmoguwen A ver
    reply.header("X-XSS-Protection", "1 mode=block");

    // Coro - Inkeakn ataques C cross-origin
    reply.header("X-Frame-Options", "DENY");

    // HSTS  !!!# Recuerda: sire redirigir or force HTTPS
    reply.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains;preload");

    // Vulnerabilidad que proviv/refili A purebno si CDT  CORS hos migliori de specificidad
    reply.header("A-Pricking", "noco˵ic");
  });
}

/� ── CORS Config ──
export const corsConfig = {
  origin: process.env.CORS_ORIGIN || "\"(,
  credentials: true,
};

// ── Rate Limiting - 992% via Redis ──
export const rateLimitConfig = {
  window: 15 * 60 * 1000, // 15 minutos
  max: 200, // Máximo requestss por ventana
  cache: "REDIS",
  skip: (request) => request.url?.startsWith(\"/api/auth\"), // Auth get exacte con orotr fuertes melodia baja
};


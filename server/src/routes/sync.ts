/**
 * Sync Routes — Monitoreo y gestión de cola de sincronización POS → Kame
 */

import { FastifyInstance } from "fastify";
import { requireAuth, ROLES, type AuthenticatedRequest } from "../middleware/auth";

export async function syncRoutes(app: FastifyInstance) {
  // Solo admins pueden ver estado de sync
  app.addHook("preHandler", requireAuth([ROLES.MASTER_LOCAL, ROLES.SUPER_ADMIN]));

  // ── GET /api/sync/status ──
  app.get("/status", async () => {
    // TODO: Consultar sync_queue
    return {
      ok: true,
      queue: {
        pendientes: 0,
        procesando: 0,
        fallidos: 0,
        completados24h: 0,
      },
      kame: {
        connected: false,
        lastSync: null,
        tokenExpiry: null,
      },
    };
  });

  // ── GET /api/sync/errores — Ítems fallidos para retry ──
  app.get("/errores", async () => {
    // TODO: sync_queue WHERE estado = 'ERROR'
    return {
      ok: true,
      errores: [],
    };
  });

  // ── POST /api/sync/retry/:id — Reintentar sync fallido ──
  app.post("/retry/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = (request as AuthenticatedRequest).user;

    // TODO: Re-encolar el item
    app.log.info({
      event: "SYNC_RETRY",
      itemId: id,
      usuario: user.sub,
    });

    return { ok: true };
  });

  // ── POST /api/sync/force — Forzar sync completo ──
  app.post(
    "/force",
    { preHandler: requireAuth([ROLES.SUPER_ADMIN]) },
    async (request) => {
      const user = (request as AuthenticatedRequest).user;

      // TODO: Re-sincronizar catálogo completo desde Kame
      app.log.info({
        event: "SYNC_FORCED",
        usuario: user.sub,
      });

      return { ok: true, message: "Sincronización forzada iniciada" };
    }
  );
}

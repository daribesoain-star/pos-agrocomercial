/**
 * Producto Routes — Catálogo y precios por local
 */

import { FastifyInstance } from "fastify";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth";

export async function productoRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth());

  // ── GET /api/productos — Catálogo del local ──
  app.get("/", async (request) => {
    const user = (request as AuthenticatedRequest).user;
    const { familiaId, busqueda, activos } = request.query as {
      familiaId?: string;
      busqueda?: string;
      activos?: string;
    };

    // TODO: Prisma query con precios por local
    // SELECT p.*, pp.precio_venta_neto, pp.precio_con_iva
    // FROM producto p
    // JOIN producto_precio_local pp ON p.id = pp.producto_id
    // WHERE pp.local_id = $localId AND p.activo = true

    return {
      ok: true,
      productos: [],
    };
  });

  // ── GET /api/productos/familias ──
  app.get("/familias", async () => {
    // TODO: Prisma query familias activas
    return {
      ok: true,
      familias: [],
    };
  });

  // ── GET /api/productos/:id ──
  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    // TODO: Producto con stock, precios, lotes, atributos
    return reply.status(404).send({ error: "NOT_FOUND" });
  });

  // ── GET /api/productos/barcode/:codigo ──
  // Búsqueda por código de barras (scanner)
  app.get("/barcode/:codigo", async (request, reply) => {
    const { codigo } = request.params as { codigo: string };
    const user = (request as AuthenticatedRequest).user;

    // TODO: Buscar por codigoBarras
    return reply.status(404).send({
      error: "NOT_FOUND",
      message: "Producto no encontrado para este código de barras",
    });
  });
}

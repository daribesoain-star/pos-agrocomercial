/**
 * Redis Client — Cache, sessions, sync queue
 */

import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 5000);
    return delay;
  },
  lazyConnect: true,
});

redis.on("error", (err) => {
  console.error("[Redis] Error de conexión:", err.message);
});

redis.on("connect", () => {
  console.log("[Redis] Conectado");
});

// ── Cache helpers ──
export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds: number = 300
): Promise<void> {
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
}

export async function cacheDel(key: string): Promise<void> {
  await redis.del(key);
}

// ── Prefijos de cache por módulo ──
export const CACHE_KEYS = {
  productos: (localId: string) => `pos:productos:${localId}`,
  stock: (localId: string, productoId: string) => `pos:stock:${localId}:${productoId}`,
  familias: () => "pos:familias",
  kameToken: () => "pos:kame:token",
  sesion: (userId: string) => `pos:sesion:${userId}`,
} as const;

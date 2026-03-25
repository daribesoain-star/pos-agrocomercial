// Configuración centralizada del entorno
// Validación con Zod para fail-fast si falta algo

import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Redis
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // Kame ERP
  KAME_CLIENT_ID: z.string(),
  KAME_CLIENT_SECRET: z.string(),
  KAME_TOKEN_URL: z.string().default("https://api.kameone.cl/oauth/token"),
  KAME_API_URL: z.string().default("https://api.kameone.cl/api"),
  KAME_USUARIO: z.string().email(),

  // Factur-AI
  FACTUR_AI_URL: z.string().url().optional(),
  FACTUR_AI_API_KEY: z.string().optional(),

  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

// Lazy validation — solo falla cuando se accede
let _env: Env | null = null;

export function getEnv(): Env {
  if (!_env) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      console.error("❌ Variables de entorno inválidas:", result.error.flatten().fieldErrors);
      throw new Error("Configuración de entorno inválida");
    }
    _env = result.data;
  }
  return _env;
}

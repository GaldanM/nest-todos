import { z } from "zod"

enum Environments {
  Development = "development",
  Production = "production",
  Test = "test",
}

const configSchema = z.object({
  ENV: z.nativeEnum(Environments),
  DATABASE_URL: z.string().ip(),
  DATABASE_PORT: z.coerce.number().min(1024).max(65535),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  APP_PORT: z.coerce.number().min(1024).max(65535),
})

export function validateConfig(config: Record<string, unknown>) {
  return configSchema.parse(config)
}

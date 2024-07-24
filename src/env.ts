import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(1),
    BASE_API_URL_DEV: z.string(),
    BASE_API_URL_PROD: z.string(),
    SENTRY_AUTH_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_API_URL_DEV: z.string(),
    NEXT_PUBLIC_BASE_API_URL_PROD: z.string(),
  },

  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    BASE_API_URL_DEV: process.env.BASE_API_URL_DEV,
    BASE_API_URL_PROD: process.env.BASE_API_URL_PROD,
    NEXT_PUBLIC_BASE_API_URL_DEV: process.env.NEXT_PUBLIC_BASE_API_URL_DEV,
    NEXT_PUBLIC_BASE_API_URL_PROD: process.env.NEXT_PUBLIC_BASE_API_URL_PROD,
  },
});

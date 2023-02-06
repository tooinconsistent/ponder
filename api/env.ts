import { loadSync } from "$std/dotenv/mod.ts";

import { z } from "npm:zod";

const envVars = await loadSync();

export const databaseUrl = z.string().url().parse(envVars.DATABASE_URL);

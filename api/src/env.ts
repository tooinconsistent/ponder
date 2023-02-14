import { z } from "zod";

export const databaseUrl = z.string().url().parse(process.env.DATABASE_URL);

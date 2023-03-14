import { z } from "zod";

import * as dotenv from "dotenv";
dotenv.config();

export const databaseUrl = z.string().url().parse(process.env.DATABASE_URL);
export const port = z.number().parse(Number(process.env.PORT));

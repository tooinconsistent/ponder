import fs from "fs";
import path from "path";
import { Client } from "pg";

const SEEDS_PATH = path.join(import.meta.dir, "../seeds");

const client = new Client(process.env.DATABASE_URL);
await client.connect();

const seeds: Array<{ fileName: string; sql: string }> = [];

fs.readdirSync(SEEDS_PATH).forEach((fileName) => {
  const sql = fs.readFileSync(path.join(SEEDS_PATH, fileName));
  const sqlString = sql.toString();

  seeds.push({ fileName, sql: sqlString });
});

const sortedSeeds = seeds.sort((a, b) =>
  a.fileName.localeCompare(b.fileName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
);

for (const seed of sortedSeeds) {
  await client.query(seed.sql);
}

await client.end();

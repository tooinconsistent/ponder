// cd ../scripts && bun run generate:queries

import { spawn } from "child_process";
import { join } from "path";

const connectionString = process.env.GM_DBURL;

if (!connectionString) {
  console.error(
    "This script should only be called from a graphile-migrate action."
  );
  process.exit(1);
}

spawn("cd ../scripts && bun", ["run generate:queries"], {
  // cwd: join(import.meta.path, "../../scripts"),
  env: { DATABASE_URL: connectionString, PATH: process.env.PATH },
  stdio: "inherit",
  shell: true,
});

// backend/scripts/db-init.js
import "dotenv/config";
import { spawnSync } from "node:child_process";

const psql = process.env.PSQL_PATH;
const url = process.env.DATABASE_URL;

if (!psql) {
  console.error("PSQL_PATH is missing. Set it in backend/.env");
  process.exit(1);
}

if (!url) {
  console.error("DATABASE_URL is missing. Set it in backend/.env");
  process.exit(1);
}
const args = [url, "-f", "./db/init.sql"];

const result = spawnSync(psql, args, { stdio: "inherit" });

process.exit(result.status ?? 1);

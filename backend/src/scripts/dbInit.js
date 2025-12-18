// scripts/dbInit.js
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

require("dotenv").config();

async function main() {
  const sqlPath = path.join(__dirname, "..", "db", "init.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();
    await client.query(sql); // runs the whole file (multiple statements ok)
    console.log("Database initialized (db/init.sql executed).");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("db:init failed:", err.message);
  process.exit(1);
});

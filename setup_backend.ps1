
Write-Host "Setting up backend..." -ForegroundColor Cyan

# Assumes you run this from the project root
if (-not (Test-Path "backend")) {
    Write-Host "backend folder not found. Creating it..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "backend" | Out-Null
}


Set-Location backend

# Initialize npm project if needed
if (-not (Test-Path "package.json")) {
    Write-Host "Initializing npm project (npm init -y)..." -ForegroundColor Cyan
    npm init -y
}
else {
    Write-Host "package.json already exists (skipping npm init)." -ForegroundColor Yellow
}

# Install runtime deps
Write-Host "Installing runtime dependencies (express, cors, pg, dotenv, bcrypt, cookieParser)..." -ForegroundColor Cyan
npm install express cors pg dotenv bcrypt

# Install dev deps
Write-Host "Installing dev dependencies (TypeScript + @types)..." -ForegroundColor Cyan
npm install -D typescript ts-node-dev cross-env-shell @types/node @types/express @types/cors @types/pg @types/cookie-parser @types/bcrypt


# Create tsconfig.json if missing
if (-not (Test-Path "tsconfig.json")) {
    Write-Host "Creating tsconfig.json..." -ForegroundColor Cyan
    npx tsc --init --rootDir src --outDir dist --esModuleInterop --strict
}
else {
    Write-Host "tsconfig.json already exists (skipping)." -ForegroundColor Yellow
}

# Create src folder if missing
if (-not (Test-Path "src")) {
    Write-Host "Creating src folder..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path "src" | Out-Null
}

# Create a starter server.ts if missing
if (-not (Test-Path "src\server.ts")) {
    Write-Host "Creating starter src\server.ts..." -ForegroundColor Cyan

    @'
import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { Pool } from "pg";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set (create a .env file in backend/)");
}

const pool = new Pool({ connectionString });

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!", time: new Date().toISOString() });
});

app.post("/api/accounts", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email, and password are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO accounts (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, passwordHash]
    );

    res.status(201).json({ message: "Account created", account: result.rows[0] });
  } catch (err: any) {
    console.error("Error creating account:", err);

    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
'@ | Set-Content -Path "src\server.ts" -Encoding UTF8
}
else {
    Write-Host "src\server.ts already exists (skipping)." -ForegroundColor Yellow
}

# Add useful scripts to package.json (simple overwrite-safe approach: just print what to add)
Write-Host ""
Write-Host "Done installing backend dependencies." -ForegroundColor Green
Write-Host "Make sure backend\package.json has scripts like:" -ForegroundColor Yellow
Write-Host '  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"' -ForegroundColor Yellow
Write-Host '  "build": "tsc"' -ForegroundColor Yellow
Write-Host '  "start": "node dist/server.js"' -ForegroundColor Yellow
Write-Host ""
Write-Host "Next:" -ForegroundColor Cyan
Write-Host "  2) Run: npm run dev" -ForegroundColor Cyan

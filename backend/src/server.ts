import "dotenv/config";
import express, { Request, Response } from "express";
import createAccount from "./routes/accounts"
import cors from "cors";
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

app.post("/api/accounts", createAccount);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

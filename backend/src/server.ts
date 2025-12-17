import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import accountRoutes from "./routes/accounts.routes";
import authRoutes from "./routes/auth.routes";

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

app.use("/api/accounts", accountRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

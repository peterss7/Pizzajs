import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import accountRoutes from "./routes/accounts.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "localhost";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set (create a .env file in backend/)");
}


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!", time: new Date().toISOString() });
});

app.use("/api/accounts", accountRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`);
});

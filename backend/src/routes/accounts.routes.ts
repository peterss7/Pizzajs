import { Request, Response, Router } from "express";
import { pool } from "../db/db";
import { PassThrough } from "node:stream";

type Account = {
    id: string;
    name?: string;
    createdAt: string;
}

const accountRouter = Router();

accountRouter.post("/", async (req: Request, res: Response) => {
    try{
        const { name, password } = req.body as {
            name?: string;
            password?: string;
        };

        if (!name || !password) {
            return res.status(400).json({error: "name and password required."});
        }

        const result = await pool.query(
            `INSERT INTO accounts (name, password)
            VALUES ($1, $2)
            RETURNING id, name, password`,
            [name, password]
        );

        const account: Account = {
            id: crypto.randomUUID(),
            name: name,
            createdAt: new Date().toISOString(),
        }
        return res.status(201).json(account);
    } catch (error: any){
        // console.error("Error creating account: ", error);

        // // 23505 breaks unique constraint
        // if (error.code === "23505"){
        //     return res.status(409).json({ error: "Email already in use."});
        // }

        return res.status(500).json({ error: "Internal server error."});
    }
});

accountRouter.get("/", async(req: Request, res: Response) => {
    try{
        const result = await pool.query(
            `SELECT id, name, password
            FROM accounts
            ORDER BY id DESC`
        );

        return res.json(result.rows);
    } catch(error: any){
        console.error("Error fetching accounts: ", error);
        return res.status(500).json({error: "Internal server error..."});
    }
});

export default accountRouter;
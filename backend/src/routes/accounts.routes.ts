import { Request, Response, Router } from "express";
import { pool } from "../db/db";

const accountRouter = Router();

accountRouter.post("/", async (req: Request, res: Response) => {
    try{
        const { name } = req.body as {
            name?: string;
        };

        if (!name) {
            return res.status(400).json({error: "name required."});
        }

        const result = await pool.query(
            `INSERT INTO accounts (name)
            VALUES ($1)
            RETURNING id, name`,
            [name]
        );

        return res.status(201).json({
            message: "Account created.",
            account: result.rows[0],
        });
    } catch (error: any){
        console.error("Error creating account: ", error);

        // 23505 breaks unique constraint
        if (error.code === "23505"){
            return res.status(409).json({ error: "Email already in use."});
        }

        return res.status(500).json({ error: "Internal server error."});
    }
});

accountRouter.get("/", async(req: Request, res: Response) => {
    try{
        const result = await pool.query(
            `SELECT id, name
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
import { Request, Response, Router } from "express";
import { pool } from "../db/db";
import { PassThrough } from "node:stream";
import { hashPassword } from "../utils/cryptUtils";

type Account = {
    id: string;
    username?: string;
    createdAt: string;
}

const accountRouter = Router();

accountRouter.post("/", async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body as {
            username?: string;
            password?: string;
        };



        if (!username || !password) {
            return res.status(400).json({error: "name and password required."});
        }

        const passwordHash = await hashPassword(password);

        const result = await pool.query(
            `INSERT INTO accounts (username, password_hash)
            VALUES ($1, $2)
            RETURNING id, username, password_hash`,
            [username, passwordHash]
        );

        const account: Account = {
            id: crypto.randomUUID(),
            username: username,
            createdAt: new Date().toISOString(),
        }
        return res.status(201).json(account);
    } catch (error: any){
        // console.error("Error creating account: ", error);

        // // 23505 breaks unique constraint
        // if (error.code === "23505"){
        //     return res.status(409).json({ error: "Email already in use."});
        // }

        return res.status(500).json({ error: "in post account Internal server error."});
    }
});

accountRouter.get("/", async(req: Request, res: Response) => {
    try{
        const result = await pool.query(
            `SELECT id, username, password_hash
            FROM accounts
            ORDER BY id DESC`
        );

        return res.json(result.rows);
    } catch(error: any){
        console.error("Error fetching accounts: ", error);
        return res.status(500).json({error: "in get all Internal server error..."});
    }
});

// accountRouter.delete("/", async(req: Request, res: Response) => {
//     try {
//         const result = await pool.query(

//         );
//     } catch(error: any){
//         console.error("Error deleting accounts");
//         return res.status(500).json({error: "Internal server error..."});
//     }
// })

export default accountRouter;
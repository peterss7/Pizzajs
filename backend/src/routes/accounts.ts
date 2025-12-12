import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db/db";

export default async function createAccount(req: Request, res: Response) {
    try{
        const { name } = req.body as {
            name?: string;
        };

        if (!name) {
            return res.status(400).json({error: "name required."});
        }

        console.log("name", name);

        // if (!email.includes("@")){
        //     // TO-DO use regex
        //     return res.status(400).json({error: "Invalid email."});
        // }

        // if (password.length < 6) {
        //     return res.status(400).json({error: "Password requires at least 6 characers."});
        // }

        // const passwordHash = await bcrypt.hash(password, 10);

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
}


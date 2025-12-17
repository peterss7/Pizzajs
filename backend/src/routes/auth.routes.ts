import { Router, Response, Request } from "express";

type Account = {
    id: string;
    username?: string;
    createdAt: string;
}

const authRouter = Router();

authRouter.get("/auth", async (req: Request, res: Response) => {
    try {
        
        return res.json({});
    } catch (error: any) {
        console.error("Error fetching accounts: ", error);
        return res.status(500).json({ error: "in get all Internal server error..." });
    }
});

export default authRouter;
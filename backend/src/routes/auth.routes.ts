import { Router, Response, Request } from "express";
import { cookieOptions, hashPassword, newSessionId, verifyPassword } from "../utils/cryptUtils";
import { pool } from "../db/db";

type SignupRequest = {
    name?: string;
    email?: string;
    password?: string;
}

type LoginRequest = {
    email?: string;
    password?: string;
}

const SESSION_COOKIE = "sid";
const SESSION_TTL_DAYS = 14;

function sessionExpiry() {
    const d = new Date();
    d.setDate(d.getDate() + SESSION_TTL_DAYS);
    return d;
}

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    const { email, name, password } = req.body as SignupRequest;

    if (!email || !name || !password) return res.status(400).json({ error: "Name, password, and email required." });

    const passwordHash = await hashPassword(password);

    try {
        const result = await pool.query(
            `insert into users (email, name, password_hash)
            values ($1, $2, $3)
            returning id, email, name`,
            [email.toLocaleLowerCase(), name, passwordHash]
        );

        const user = result.rows[0];
        const sid = newSessionId();
        const expiresAt = sessionExpiry();

        await pool.query(
            `insert into sessions(id, user_id, expires_at)
            values ($1, $2, $3)`,
            [sid, user.id, expiresAt]
        );

        res.cookie(SESSION_COOKIE, sid, { ...cookieOptions(), expires: expiresAt });
        return res.status(201).json(user);
    } catch (e: any) {
        if (String(e?.code) === "23505") return res.status(409).json({ error: "Email already in use." });
        console.error(e);
        return res.status(500).json({ error: "Internal server error..." });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) return res.status(400).json({ error: "Email and password required." });

    const result = await pool.query(
        `select id, email, name, password_hash
        from users
        where email = $1`,
        [email.toLowerCase()]
    );

    const user = result.rows[0];
    const ok = user ? await verifyPassword(user.password_hash, password) : false;

    if (!ok) return res.status(401).json({ error: "Invalid credentials..." });

    const sid = newSessionId();
    const expiresAt = sessionExpiry();

    await pool.query(
        `insert into sessions (id, user_id, expires_at)
        values ($1, $2, $3)`,
        [sid, user.id, expiresAt]
    );

    res.cookie(SESSION_COOKIE, sid, { ...cookieOptions(), expires: expiresAt });
    return res.json({ id: user.id, email: user.email, name: user.name });
});

authRouter.post("/logout", async(req, res) => {
    const sid = req.cookies?.[SESSION_COOKIE];
    if (sid) {
        await pool.query(`delete from sessions where id = $1`, [sid]);
    }
    res.clearCookie(SESSION_COOKIE, cookieOptions());
    return res.json({ message: "Logged out..."});
});

authRouter.get("/me", async (req, res) => {
    const sid = req.cookies?.[SESSION_COOKIE];
    if (!sid) return res.status(401).json({error: "Not authenticated"});

    const result = await pool.query(
        `select u.id, u.email, u.name 
        from sessions s
        join users u on u.id = s.user_id
        where s.id = $1
            and s.expires_at > now()`,
        [sid]
    );

    const me = result.rows[0];
    if (!me) return res.status(401).json({error: "Not authenticated..."});

    return res.json(me);
});
import { useEffect, useRef, useState } from "react";
import { CANVAS_BG_SRC } from "../../../constants/CANVAS_CONSTANTS";
import useDrawCanvas from "../../../hooks/useDrawCanvas";
import { useSprite } from "../../../hooks/useSprite";
import { Canvas } from "../../../styles/CanvasStyles";
import SignupForm from "../../auth/components/SignupForm";
import { useAuth } from "../../../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const cellWidth = width / 10;
    const cellHeight = height / 10;

    const formLeft = cellWidth * 3.5;
    const formTop = cellHeight * 2;
    const formWidth = cellWidth * 3
    const formHeight = cellHeight * 3;

    const bgImage = useSprite(CANVAS_BG_SRC);
    const { drawGrid } = useDrawCanvas();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    async function onSubmit() {
        setError(null);
        setIsSubmitting(true);

        try {
            signup({ email: email, password: password });
            navigate("/home", {replace: true});
        } catch (err: any) {
            setError(err?.message ?? "Signup failed");
        } finally{
            setIsSubmitting(false);
        }
    }

    // handle resize
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        if (bgImage) {
            ctx.drawImage(bgImage, 0, 0, width, height);
        } else {
            ctx.fillStyle = "#333333";
            ctx.fillRect(0, 0, width, height);
        }

        drawGrid(ctx, width, height);

        ctx.fillStyle = "#6d7925ff";
        ctx.fillRect(formLeft - cellWidth * .1, formTop - cellHeight * .1, formWidth, formHeight);
        ctx.fillStyle = "#99aa33";
        ctx.fillRect(formLeft, formTop, formWidth, formHeight);


    }, [width, height, bgImage]);

    return (
        <div>
            <Canvas ref={canvasRef} />
            <h1 style={{
                color: "white",
                position: "absolute",
                left: cellWidth * 4.25,
                top: cellHeight * .75
            }}>Signup</h1>
            <SignupForm
                top={formTop}
                left={formLeft}
                width={formWidth}
                height={formHeight}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={onSubmit}
            />
        </div>
    );
}
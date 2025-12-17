import { useEffect, useRef, useState } from "react";
import { useSprite } from "../../../hooks/useSprite";
import { Canvas } from "../../../styles/CanvasStyles";
import { CANVAS_BG_SRC } from "../../../constants/CANVAS_CONSTANTS";
import LoginForm from "../../auth/components/LoginForm";
import useDrawCanvas from "../../../hooks/useDrawCanvas";
import { useAuth } from "../../../auth/useAuth";


export default function Login() {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const [usernameValue, setUsernameValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const cellWidth = width / 10;
    const cellHeight = height / 10;
    const formLeft = cellWidth * 3.5;
    const formTop = cellHeight * 2;
    const formWidth = cellWidth * 3
    const formHeight = cellHeight * 3;

    const { login } = useAuth();
    const bgImage = useSprite(CANVAS_BG_SRC);
    const { drawGrid } = useDrawCanvas();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function onLogin() {
        login({ username: usernameValue, password: passwordValue });
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
            <LoginForm
                onLogin={onLogin}
                top={formTop}
                left={formLeft}
                width={formWidth}
                height={formHeight}
                usernameValue={usernameValue}
                passwordValue={passwordValue}
                setUsernameValue={setUsernameValue}
                setPasswordValue={setPasswordValue}
            />
        </div>

    );
}
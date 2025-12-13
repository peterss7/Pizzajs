import { useEffect, useRef, useState } from "react"
import AccountCreateForm from "../features/accounts/AccountCreateForm";
import useDrawAccounts from "../hooks/useDrawAccountCreateForm";
import useDrawCanvas from "../hooks/useDrawCanvas";


export default function PzCanvas() {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const { drawBackground } = useDrawCanvas();
    const { drawCreateAccountForm } = useDrawAccounts();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;
        
        drawBackground(ctx, width, height);
        drawCreateAccountForm(ctx, width, height);

    }, [width, height]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "block",
                    background: "#0f0",
                }}
            />
            <AccountCreateForm
                width={width}
                height={height}
                canvasRef={canvasRef}
            />
        </div >
    )
}
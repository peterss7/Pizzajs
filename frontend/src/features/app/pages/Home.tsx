import { useEffect, useRef, useState } from "react";
import { useSprite } from "../../../hooks/useSprite";
import { Canvas } from "../../../styles/CanvasStyles";

const BG_IMAGE_SRC = "/HOME_0.png";

export default function Home() {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const bgImage = useSprite(BG_IMAGE_SRC);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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


    }, [width, height, bgImage]);

    return (
        <div>
            <Canvas ref={canvasRef} />
            <div>
                <h1>HOME</h1>
            </div>
        </div>

    );
}
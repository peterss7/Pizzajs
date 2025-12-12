import { useEffect, useRef, useState } from "react"
import useDrawCanvas from "./useDrawCanvas";
import { Canvas } from "./CanvasStyles";
import { AnnexTextInput } from "../../components/inputs/AnnexTextInputStyles";
import TextInputContainer from "../../components/inputs/TextInputContainer";

export default function GameCanvas() {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    
    const { drawBackground } = useDrawCanvas();
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

    }, [width, height]);

    return (
        <div>
            <Canvas
                ref={canvasRef}
            />
            <TextInputContainer />
        </div>
    )
}
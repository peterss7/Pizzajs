import { useState, useRef, useEffect } from "react";
import useDrawCanvas from "../../../hooks/useDrawCanvas";

export default function LoginPage(){
     const [width, setWidth] = useState<number>(window.innerWidth);
        const [height, setHeight] = useState<number>(window.innerHeight);
        const cellWidth: number = window.innerWidth / 10;
        const cellHeight: number = window.innerHeight / 10;
    
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
        </div >
    )
}
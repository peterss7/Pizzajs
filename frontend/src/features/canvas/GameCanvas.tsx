import { useEffect, useRef, useState } from "react"
import useDrawCanvas from "./useDrawCanvas";
import { Canvas } from "./CanvasStyles";
import { AnnexTextInput } from "../../components/inputs/AnnexTextInputStyles";
// import useMouse from "../hooks/useMouse";

export type Coords = {
    x: number;
    y: number;
}

const INITIAL_COORDS: Coords = { x: 0, y: 0 };

export default function GameCanvas() {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [coords, setCoords] = useState<Coords>(INITIAL_COORDS);
    const { drawBackground } = useDrawCanvas();

    const [inputValue, setInputValue] = useState<string>("");

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>){
        console.log(`val: ${e.target.value}`);
        setInputValue(e.target.value);
    }

    function onClick(e: React.MouseEvent) {
        const canvas = canvasRef.current;

        console.log(`input val: ${inputValue}`);

        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        setCoords({ x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY });
    }

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

        console.log(`(${coords.x}, ${coords.y})`);

        drawBackground(ctx, width, height);

        ctx.fillStyle = "#333";
        ctx.strokeStyle = "#fff";
        ctx.fillRect(30, 30, 70, 70);
        ctx.strokeRect(50, 50, 40, 40);
        ctx.fillStyle = "#fff";
        ctx.fillText(`(${coords.x}, ${coords.y})`, 40, 40);

    }, [width, height, coords.x, coords.y]);

    return (
        <div>
            <Canvas
                ref={canvasRef}
                onClick={onClick}
            />
            
            <AnnexTextInput 
                value={inputValue}
                onChange={onChangeInput}
                onSubmit={() => console.log(`text: ${inputValue}`)}
            />
        </div>
    )
}
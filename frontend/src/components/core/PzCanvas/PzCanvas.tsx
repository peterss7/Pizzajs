import { useEffect, useRef, useState } from "react"
import TextInputContainer from "../../forms/inputs/TextInputContainer";
import useDrawCanvas from "../../../hooks/useDrawCanvas";
import PzButtonBar from "../../forms/buttons/PzButtonBar";

export type Coords = {
    x: number;
    y: number;
}

const INITIAL_COORDS: Coords = { x: 0, y: 0 };

export default function PzCanvas() {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [coords, setCoords] = useState<Coords>(INITIAL_COORDS);
    const { drawBackground } = useDrawCanvas();

    const [inputValue, setInputValue] = useState<string>("");

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function onClick(e: React.MouseEvent) {
        const canvas = canvasRef.current;

        console.log(`input val: ${inputValue}`);

        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        setCoords({ x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY });
    }

    function onSubmit() {
        console.log(`hit submit`);
    }

    function onCancel() {
        console.log(`hit cancel`);
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
        const cellWidth = width / 10;
        const cellHeight = height / 10;

        console.log(`(${coords.x}, ${coords.y})`);

        drawBackground(ctx, width, height);

        ctx.fillStyle = "#000";
        ctx.fillRect((width / 10) * 2, (height / 10) * 2, (width / 10) * 5, (height / 10) * 3);

        
        
        ctx.fillStyle = "#0A0";
        ctx.strokeRect(cellWidth*2.5, cellHeight * 2.5, cellWidth * 4, cellHeight * 1);
        ctx.fillStyle = "#909";
        ctx.font = "24px sans-serif";          // 👈 text size here
        ctx.textAlign = "center";               // optional: center in the box
        ctx.textBaseline = "middle";
        ctx.fillText("Hello", cellWidth * 3, cellHeight * 2.66);



    }, [width, height, coords.x, coords.y]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                onClick={onClick}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "block",
                    background: "#000",
                }}
            />
            <div>
                <PzButtonBar
                    buttonsProps={[
                        {
                            left: (width / 10) * 3,
                            top: (height / 10) * 4,
                            value: "Cancel",
                            onClick: onCancel
                        },
                        {
                            left: (width / 10) * 5,
                            top: (height / 10) * 4,
                            value: "Submit",
                            onClick: onSubmit
                        }
                    ]} />
            </div>
        </div>
    )
}
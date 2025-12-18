import { useEffect, useRef, useState } from "react"
import useDrawAccounts from "../hooks/useDrawAccountCreateForm";
import useDrawCanvas from "../hooks/useDrawCanvas";
import { useAccountContext } from "../stores/useAccountContext";


export default function PizzaCanvas() {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const cellWidth: number = window.innerWidth / 10;
    const cellHeight: number = window.innerHeight / 10;

    const { drawBackground } = useDrawCanvas();
    const { drawCreateAccountForm } = useDrawAccounts();
    const { isCreateOpen: isCreateAccountOpen, setIsCreateOpen: setIsCreateAccountOpen } = useAccountContext();

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

        if (isCreateAccountOpen) {
            console.log("draw account form");
            drawCreateAccountForm(ctx, width, height);
        }
    }, [width, height, isCreateAccountOpen]);

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
            {/* <AccountCreateForm
                width={width}
                height={height}
            /> */}
            {/* {!isAuthenticated &&
                <>
                    <PzButton
                        value={"Login"}
                        bgColor={"#441c06ff"}
                        textColor={"#fff"}
                        // onClick={() => login()}
                    />
                    {!isCreateAccountOpen &&
                        <PzButton
                            value={"Sign up!"}
                            bgColor={"#441c06ff"}
                            textColor={"#fff"}
                            onClick={() => setIsCreateAccountOpen(true)}
                            left={cellWidth * 8.5}
                            top={cellHeight}
                        />}

                </>
            } */}

        </div >
    )
}
import { useEffect } from "react";
import PzButton, { type PzButtonProps } from "./PzButton";


export type PzButtonBarProps = {
    spacingX?: number;
    spacingY?: number;
    flexDirection?: "row" | "column";
    buttonsProps: PzButtonProps[];
    canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export default function PzButtonBar(props: PzButtonBarProps) {
    const { buttonsProps, spacingX, flexDirection } = props;

    useEffect(() => {

    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: flexDirection ?? "row",
                gap: spacingX
            }}
        >
            <>
                {buttonsProps.map((x, i) => (
                    <PzButton key={i} {...x} />
                ))}
            </>
        </div>
    )
}
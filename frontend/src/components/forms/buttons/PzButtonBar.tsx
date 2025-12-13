import { useEffect } from "react";
import type { PzButtonBarProps } from "./PzButtonTypes"
import PzButton from "./PzButton";


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
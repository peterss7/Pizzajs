import PZButton from "./PZButton"
import type { PzButtonBarProps } from "./PzButtonTypes"


export default function PzButtonBar(props: PzButtonBarProps) {
    const { buttonsProps, spacingX, flexDirection } = props;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: flexDirection ?? "row",
                gap: spacingX
            }}
        >
            <PZButton
                {...buttonsProps[0]}
            />
            <PZButton
                {...buttonsProps[1]}
            />
        </div>
    )
}
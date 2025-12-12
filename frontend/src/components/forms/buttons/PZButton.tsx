import type { ElementLocationType } from "../../shared/ElementLocationTypes";

type ButtonProps = {
    value?: string;
    onClick: () => void;
    elementLocation: ElementLocationType;
}

export default function PZButton(props: ButtonProps) {
    const { elementLocation, onClick, value} = props;

    return (
        <input
            type={"button"}            
            value={value ?? ""}
            onClick={onClick}
            style={{
                position: "absolute",
                left: elementLocation?.left ?? 0,
                bottom: elementLocation?.bottom ?? 0,
                width: elementLocation?.width ?? 0,
                height: elementLocation?.height ?? 50
            }}
        />
    );
}
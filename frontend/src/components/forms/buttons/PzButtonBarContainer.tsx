import type { ElementLocationType } from "../../shared/ElementLocationTypes";
import PZButton from "./PZButton";

type PzButtonBar = {
    onSubmit: () => void;
    onCancel: () => void;
    elementLocation: ElementLocationType;
}

export default function PzButtonBarContainer(props: PzButtonBar) {
    const { onSubmit, onCancel, elementLocation } = props;

    return (
        <div
            style={{
                bottom: elementLocation?.bottom ?? 0,
                left: elementLocation?.left ?? 0,
                width: elementLocation?.width ?? "10vw",
                height: elementLocation?.height ?? 0
            }}
        >
            <PZButton
                elementLocation={{
                    left: 340,
                    bottom: 315,
                    width: 60,
                    height: 20
                }}
                value={"Submit"}
                onClick={onSubmit}
            />
            <PZButton
                elementLocation={{
                    left: 410,
                    bottom: 315,
                    width: 60,
                    height: 20
                }}
                value={"Cancel"}
                onClick={onCancel}
            />
        </div>
    );
}
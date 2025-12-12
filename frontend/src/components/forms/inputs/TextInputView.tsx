import type { ElementLocationType } from "../../shared/types/ElementLocationTypes";

type TextInputViewProps = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    value: string;
    onChange: (val: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    elementLocation: ElementLocationType;
}

export default function TextInputView(props: TextInputViewProps) {
    const {
        inputRef,
        value,
        onChange,
        onKeyDown,
        elementLocation
    } = props;

    return (
        <div>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown ?? undefined}
                placeholder="Type here..."
                style={{
                    position: "absolute",
                    left: elementLocation?.left ?? 0,
                    bottom: elementLocation?.bottom ?? 0,
                    width: elementLocation?.width ?? 150,
                }}
            />
        </div>
    )
}
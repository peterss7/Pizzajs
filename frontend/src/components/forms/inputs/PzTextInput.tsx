import { useRef } from "react";
import type { PzTextInputProps } from "./PzTextInputTypes";
import { INPUT_HEIGHT, INPUT_LEFT, INPUT_PLACEHOLDER, INPUT_TOP, INPUT_VALUE, INPUT_WIDTH } from "./PzInputConstants";


export default function PzTextInput(props: PzTextInputProps) {
    const { 
        value, 
        onChange, 
        onKeyDown,
        left,
        top,
        width,
        height,
        placeholder,
        label
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <label>
                {label ?? "LABEL"}
            </label>
            <input
                ref={inputRef}
                value={value ?? INPUT_VALUE}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={(e) => onKeyDown?.(e)}
                placeholder={placeholder ?? INPUT_PLACEHOLDER}
                style={{
                    position: "absolute",
                    top: top ?? INPUT_TOP,
                    left: left ?? INPUT_LEFT,
                    width: width ?? INPUT_WIDTH,
                    height: height ?? INPUT_HEIGHT,
                }}
            />
        </div>
    )
}
import { useRef } from "react";
import type { HtmlElement } from "../../../types/HtmlElement";
import { INPUT_VALUE, INPUT_PLACEHOLDER, INPUT_TOP, INPUT_LEFT, INPUT_WIDTH, INPUT_HEIGHT } from "../../../constants/INPUT_DEFAULTS";


export type PzInputProps = {
    value?: string;
    onChange?: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
} & HtmlElement

export default function PzInput(props: PzInputProps) {
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
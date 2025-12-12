import type { ChangeEvent } from "react";

type TextInputViewProps = {
    inputRef: React.RefObject<HTMLInputElement>;
    value: string;
    onChange: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TextInputView(props: TextInputViewProps) {
    const {inputRef, value, onChange, onKeyDown} = props;

    return (
        <div>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e)}
                onKeyDown={(e) => onKeyDown(e)}
                placeholder="Type here…"
            />
        </div>
    )
}
import { useRef } from "react";
import { AnnexInputWrapper, AnnexTextInput } from "./AnnexTextInputStyles";

type TextInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
};

export function TextInput(props: TextInputProps) {
    const {value, onChange, onSubmit} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <AnnexInputWrapper style={{ position: "relative" }}>
            <AnnexTextInput
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSubmit?.();
                }}
                placeholder="Type here…"
            />
        </AnnexInputWrapper>
    );
}

import { useRef, useState } from "react";
import TextInputView from "./TextInputView";
import type { ElementLocationType } from "../../shared/types/ElementLocationTypes";

type TextInputContainerProps = {
    value: string;
    onChange: (val: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    elementLocation: ElementLocationType;
}

export default function TextInputContainer(props: TextInputContainerProps){
    const { value, onChange, onKeyDown} = props;

    const inputRef = useRef<HTMLInputElement>(null);
    
    return(
        <TextInputView
            {...props}
            inputRef={inputRef}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    )
}
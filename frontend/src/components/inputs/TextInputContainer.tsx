import { useRef, type ChangeEvent } from "react";
import TextInputView from "./TextInputView";

export default function TextInputContainer(){
    const inputRef = useRef<HTMLInputElement>(null);
    
    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>)
    {
        if (e.key === "Enter"){
            
        }
    }
    return(
        <TextInputView />
    )
}
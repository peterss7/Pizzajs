import { useEffect, useState } from "react";
import type { KeysState } from "../types/KeysState";

export const INITIAL_KEYS: KeysState = {
  enter: false,
};

const targetKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"];

export default function useArrowKeys(): KeysState {
    const [keys, setKeys] = useState<KeysState>(INITIAL_KEYS);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (targetKeys.includes(e.key)) {
                setKeys((prev) => ({ ...prev, [e.key]: true }));
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (targetKeys.includes(e.key)) {
                setKeys((prev) => ({ ...prev, [e.key]: false }));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    });
    return keys;
}
import type { ElementType } from "../../../shared/types/ElementTypes";

export type PzTextInputProps = {
    value?: string;
    onChange?: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
} & ElementType
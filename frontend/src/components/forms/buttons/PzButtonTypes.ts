import type { AccountDto } from "../../../shared/types/DtoTypes";
import type { ElementType } from "../../../shared/types/ElementTypes";

export type PzButtonProps = {
    value?: string;
    boxShadow?: string;
    textColor?: string;
    border?: string;
    bgColor?: string;
    fontSize?: string;
    offsetX?: number;
    onClick?: (() => void) | ((val: AccountDto) => void);
} & ElementType


export type PzButtonBarProps = {
    spacingX?: number;
    spacingY?: number;
    flexDirection?: "row" | "column";
    buttonsProps: PzButtonProps[];
    canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}
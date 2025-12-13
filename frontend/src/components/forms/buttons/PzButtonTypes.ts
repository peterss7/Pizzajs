
export type PzButtonProps = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    value?: string;
    boxShadow?: string;
    textColor?: string;
    border?: string;
    bgColor?: string;
    fontSize?: string;
    offsetX?: number;
    onClick?: () => void;
}


export type PzButtonBarProps = {
    spacingX?: number;
    spacingY?: number;
    flexDirection?: "row" | "column";
    buttonsProps: PzButtonProps[];
}
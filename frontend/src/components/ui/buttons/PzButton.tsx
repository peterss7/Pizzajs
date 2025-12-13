import { BOX_SHADOW, BUTTON_BG_COLOR, BUTTON_BORDER, BUTTON_FONT_SIZE, BUTTON_HEIGHT, BUTTON_LEFT, BUTTON_ON_CLICK, BUTTON_TEXT_COLOR, BUTTON_TOP, BUTTON_VALUE, BUTTON_WIDTH } from "../../../constants/BUTTON_DEFAULTS";
import type { HtmlElement } from "../../../types/HtmlElement";

export type PzButtonProps = {
    value?: string;
    boxShadow?: string;
    textColor?: string;
    border?: string;
    bgColor?: string;
    fontSize?: string;
    offsetX?: number;
    onClick?: () => void;
    onSubmit?: () => void;
    onCancel?: () => void;
} & HtmlElement

export default function PzButton(props: PzButtonProps) {
    const { 
        value, 
        left, 
        top,
        width,
        height,
        boxShadow,
        textColor,
        bgColor,
        border,
        fontSize,
        onSubmit,
        onClick,
    } = props;

    return (
        <input
            type={"button"}            
            onClick={onClick ?? BUTTON_ON_CLICK}
            onSubmit={onSubmit ?? BUTTON_ON_CLICK}
            value={value ?? BUTTON_VALUE}
            style={{
                fontSize: fontSize ?? BUTTON_FONT_SIZE,
                border: border ?? BUTTON_BORDER,
                backgroundColor: bgColor ?? BUTTON_BG_COLOR,
                color: textColor ?? BUTTON_TEXT_COLOR,
                position: "absolute",
                left: (left ?? BUTTON_LEFT),
                top: top ?? BUTTON_TOP,
                width: width ?? BUTTON_WIDTH,
                height: height ?? BUTTON_HEIGHT,
                boxShadow: boxShadow ?? BOX_SHADOW
            }}
        />
    );
}
import { BOX_SHADOW, BUTTON_BG_COLOR, BUTTON_BORDER, BUTTON_FONT_SIZE, BUTTON_HEIGHT, BUTTON_LEFT, BUTTON_ON_CLICK, BUTTON_TEXT_COLOR, BUTTON_TOP, BUTTON_VALUE, BUTTON_WIDTH } from "./PzButtonConstants";
import type { PzButtonProps } from "./PzButtonTypes";


export default function PZButton(props: PzButtonProps) {
    const { 
        onClick, 
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
        offsetX,
    } = props;

    return (
        <input
            type={"button"}            
            value={value ?? BUTTON_VALUE}
            onClick={onClick ?? BUTTON_ON_CLICK}
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
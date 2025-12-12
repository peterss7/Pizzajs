### Prevent Keyboard input listeners when doing input
// CanvasTextInput.tsx

e.stopPropagation();
const k = e.key;
if (
    k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight" ||
    k === " " || k.toLowerCase() === "w" || k.toLowerCase() === "a" ||
    k.toLowerCase() === "s" || k.toLowerCase() === "d"
) {
    e.preventDefault();
}

if (k === "Enter") {
    e.preventDefault();
    onSubmit();
}

if (k === "Escape") {
    e.preventDefault();
    onCancel?.();
}

<Thing
    onMouseDown={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}
/>
 
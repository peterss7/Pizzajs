export default function useDrawAccounts() {
    function drawCreateAccountForm(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const cellX = width / 10;
        const cellY = height / 10;

        ctx.fillStyle = "#666";
        ctx.fillRect(cellX * 2.42, cellY * 2.4, cellX * 2.5, cellY * 2.5);
        ctx.fillStyle = "#222";
        ctx.fillRect(cellX * 2.5, cellY * 2.5, cellX * 2.5, cellY * 2.5);
        console.log("cellX", cellX);

        ctx.font = "16px sans-serif";          // 👈 text size here
        ctx.textAlign = "center";               // optional: center in the box
        ctx.textBaseline = "middle";
        ctx.strokeRect(cellX * 2.8, cellY * 2.6, cellX * 2, cellY * .5);
        ctx.fillStyle = "#f00";
        ctx.fillText("Fill in required info and register.", cellX * 3.8, cellY * 2.9);
    }
    return { drawCreateAccountForm }
}

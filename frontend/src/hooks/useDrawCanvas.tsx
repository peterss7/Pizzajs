import { height } from "@mui/system";

export default function useDrawCanvas() {


    function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgb(40, 1, 2)";
        ctx.fillRect(0, 0, width, height);

        drawGrid(ctx, width, height)
    }

    function drawMainSection(ctx: CanvasRenderingContext2D) {

    }

    function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
        console.log("draw grid width: ", width)

        ctx.font = "24px sans-serif";          // 👈 text size here
        ctx.textAlign = "center";               // optional: center in the box
        ctx.textBaseline = "middle";

        for (let i: number = 0; i <= 10; i++) {
            ctx.fillStyle = "#000";
            ctx.fillRect(i * (width / 10), 0, 5, height);

            ctx.strokeRect(i * (width / 10) + 5, 20, 75, 30);
            ctx.fillStyle = "#f00";
            ctx.fillText(`${i}`, i * (width / 10) + 5, 35);
        }

        for (let i: number = 0; i <= 10; i++) {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, i * (height / 10), width, 2);

            ctx.strokeRect(25, i * (height / 10), 75, 2);
            ctx.fillStyle = "#909";
            ctx.fillText(`${i}`, 60, i * (height / 10) + 10);
        }


        ctx.font = "10px sans-serif";  

    }


    function drawLine(ctx: CanvasRenderingContext2D) {

    }

    return {
        drawBackground,
        drawMainSection,
        drawGrid
    }
}
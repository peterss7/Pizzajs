
export default function useDrawCanvas(){
    
    
    function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#888";
        ctx.fillRect(0, 0, width, height);
    }

    function drawMainSection(ctx: CanvasRenderingContext2D) {

    }

    return {
        drawBackground,
        drawMainSection
    }
}
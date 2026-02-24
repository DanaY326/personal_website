

export default class Score {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scaleRatio: number;

    score = 0;
    scores = {
        cScore : 0,
        cppScore : 0,
        jsScore : 0,
        pythonScore : 0,
        reactScore : 0,
    }
    HIGH_SCORE_KEY = "highScore";

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(frameTimeDelta: number) {
        this.score += frameTimeDelta * 0.01;
    }

    reset() {
        this.score = 0;
        for (var key in this.scores) {
            this.scores[key] = 0;
        }
    }
}
import bugImg from "../assets/game/bug.png"
import bugRunOneImg from "../assets/game/bug_left_step.png"
import bugRunTwoImg from "../assets/game/bug_right_step.png"

export default class Player {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    width : number;
    height : number;
    minJumpHeight : number;
    maxJumpHeight : number;
    scaleRatio : number;
    x: number;
    y: number;
    yStandingPosition: number;
    standingStillImage: HTMLImageElement;
    image: HTMLImageElement;
    bugRunImages: HTMLImageElement[];

    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, minJumpHeight: number, maxJumpHeight: number, scaleRatio: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.yStandingPosition = this.y;

        this.standingStillImage = new Image();
        this.standingStillImage.src = bugImg;
        this.image = this.standingStillImage;    
        this.bugRunImages = [];

        const bugRunImage1 = new Image();
        bugRunImage1.src = bugRunOneImg;

        const bugRunImage2 = new Image();
        bugRunImage2.src = bugRunTwoImg;

        this.bugRunImages.push(bugRunImage1);
        this.bugRunImages.push(bugRunImage2);

        //keyboard
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);

        //touch
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchEnd', this.touchEnd);
        window.addEventListener('touchstart', this.touchStart);
        window.addEventListener('touchEnd', this.touchEnd);
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    run(gameSpeed: number, frameTimeDelta: number) {
        if (this.walkAnimationTimer <= 0) {
            if (this.image === this.bugRunImages[0]) {
                this.image = this.bugRunImages[1];
            } else {
                this.image = this.bugRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.run(gameSpeed, frameTimeDelta);
        if (this.jumpInProgress) {
            this.image = this.standingStillImage;
        }
        this.jump(frameTimeDelta);
    }

    keyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            event.preventDefault();
            this.jumpPressed = true;
        }
    }

    keyUp = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            this.jumpPressed = false;
        }
    }

    touchStart = () => {
        this.jumpPressed = true;
    }

    touchEnd = () => {
        this.jumpPressed = false;
    }

    jump(frameTimeDelta: number) {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight 
                || (this.y > this.canvas.height - this.maxJumpHeight  && this.jumpPressed)) {
                    this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else if (this.y < this.yStandingPosition) {
            this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
            if (this.y + this.height > this.canvas.height) {
                this.y = this.yStandingPosition;
            }
        } else {
            this.falling = false;
            this.jumpInProgress = false;
        }
    }
}
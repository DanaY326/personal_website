import Obstacle from "./Obstacle";
import type { Sprite } from "./Obstacle"

interface imageInfo {
    width: number;
    height: number;
    image: HTMLImageElement;
}

interface score {
    image: imageInfo;
    score: number;
}

export default class ObstacleController {

    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    obstacleImages: imageInfo[];
    scaleRatio: number;
    speed: number;
    nextObstacleInterval: number;
    obstacles: Obstacle[];
    // scores: score[];

    OBSTACLE_INTERVAL_MIN = 500;
    OBSTACLE_INTERVAL_MAX = 2000;

    constructor(ctx: CanvasRenderingContext2D, obstacleImages: imageInfo[], scaleRatio: number, speed: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstacleImages = obstacleImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.obstacles = [];

        this.nextObstacleInterval = 0;
        this.setNextObstacleTime();
    }

    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    setNextObstacleTime() {
        const num = this.getRandomNumber(this.OBSTACLE_INTERVAL_MIN, this.OBSTACLE_INTERVAL_MAX);

        this.nextObstacleInterval = num;
    }

    createObstacle() {
        const index = this.getRandomNumber(0, this.obstacleImages.length - 1);
        const obstacleImage = this.obstacleImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstacleImage.height;
        const obstacle = new Obstacle(
            this.ctx, 
            x, 
            y, 
            obstacleImage.width, 
            obstacleImage.height, 
            obstacleImage.image
        );
        this.obstacles.push(obstacle);

        // console.log(this.obstacles);
    }

    collideWith(sprite: Sprite) {
        return this.obstacles.some((obstacle) => {
            return obstacle.collideWith(sprite);
        })
    }

    jumpedOver(sprite: Sprite, gameSpeed: number, frameTimeDelta: number) {
        // console.log(this.obstacles.find((obstacle) => {
        //     return obstacle.jumpedOver(sprite);
        // }));
        // return this.obstacles[0];
        return this.obstacles.find((obstacle) => {
            return obstacle.jumpedOver(sprite, gameSpeed, frameTimeDelta);
        })
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        if (this.nextObstacleInterval <= 0) {
            //create obstacle
            this.createObstacle();
            this.setNextObstacleTime();
        }
        this.nextObstacleInterval -= frameTimeDelta;
        
        this.obstacles.forEach((obstacle) => {
            obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.obstacles = this.obstacles.filter((obstacle) => {
            return obstacle.x > -obstacle.width;
        })
    }

    draw() {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw();
        })
    }

    reset() {
        this.obstacles = [];
    }
}
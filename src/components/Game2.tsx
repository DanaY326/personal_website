import { useState } from "react";
import "./game2.css"
import Player from './Player'
import Ground from './Ground'
import ObstacleController from "./ObstacleController";
import cImg from '../assets/game/c.png'
import cppImg from '../assets/game/cpp.png'
import jsImg from '../assets/game/js.png'
import pythonImg from '../assets/game/python.png'
import reactImg from '../assets/game/react.png'

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

const MAX_PERCENTAGE = 0.8;

export const getScaleRatio = () => {
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight * MAX_PERCENTAGE,
        document.body.clientHeight * MAX_PERCENTAGE
    );
    const screenWidth = Math.min(
        600,
        window.innerWidth,
        document.documentElement.clientWidth * MAX_PERCENTAGE,
        document.body.clientWidth * MAX_PERCENTAGE
    );
    
    // window is wider than the game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}

const Game = () => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;
    let ctx = canvas?.getContext("2d");

    const GAME_SPEED_START = 1.0; // 1.0
    const GAME_SPEED_INCREMENT = 0.00001;

    const PLAYER_WIDTH = 88 / 1.5; // 58
    const PLAYER_HEIGHT = 94 / 1.5; // 62
    const MAX_JUMP_HEIGHT = GAME_HEIGHT;
    const MIN_JUMP_HEIGHT = 150;
    const GROUND_WIDTH = 2400;
    const GROUND_HEIGHT = 24;
    const GROUND_AND_OBSTACLE_SPEED = 0.5;

    const OBSTACLE_CONFIG = [
        {width: 48 / 1.5, height: 100 / 1.5, image: jsImg},
        {width: 48 / 1.5, height: 100 / 1.5, image: jsImg},
        {width: 98 / 1.5, height: 100 / 1.5, image: cImg},
        {width: 98 / 1.5, height: 100 / 1.5, image: cppImg},
        {width: 98 / 1.5, height: 100 / 1.5, image: pythonImg},
        {width: 98 / 1.5, height: 100 / 1.5, image: reactImg},
        {width: 68 / 1.5, height: 70 / 1.5, image: cImg},
        {width: 68 / 1.5, height: 70 / 1.5, image: cppImg},
        {width: 68 / 1.5, height: 70 / 1.5, image: pythonImg},
        {width: 68 / 1.5, height: 70 / 1.5, image: reactImg},
    ]

    let player: Player | null = null;
    let ground: Ground | null = null;
    let obstacleController: ObstacleController | null = null;

    let previousTime: number | null = null;
    let gameSpeed = GAME_SPEED_START;
    let gameOver = false;
    let hasAddedEventListenersForRestart = false;
    let waitingToStart = true;
    const [firstTime, setFirstTime] = useState(true);
    let gameOverCounter = 1;
    let instructionCounter = 1;
    
    const createSprites = (scaleRatio: number) => {
        if (ctx) {
            const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
            const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
            const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
            const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

            const groundWidthInGame = GROUND_WIDTH * scaleRatio;
            const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

            player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
            ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_OBSTACLE_SPEED, scaleRatio);

            const obstacleImages = OBSTACLE_CONFIG.map(obstacle => {
                const image = new Image();
                image.src = obstacle.image;
                return {
                    image: image, 
                    width: obstacle.width * scaleRatio,
                    height: obstacle.height * scaleRatio,
                }
            });

            obstacleController = new ObstacleController(ctx, obstacleImages, scaleRatio, GROUND_AND_OBSTACLE_SPEED);
        }
    }

    const setScreen = () => {
        if (canvas) {
            ctx = canvas.getContext("2d");
            const scaleRatio = getScaleRatio();
            canvas.width = GAME_WIDTH * scaleRatio;
            canvas.height = GAME_HEIGHT * scaleRatio;
            createSprites(scaleRatio);
        }
    }
    
    setScreen(); 

    window.addEventListener('resize', () => {setTimeout(setScreen, 500)});

    if (screen.orientation) {
        screen.orientation.addEventListener('change', setScreen);
    }

    const clearScreen = () => {
        if (ctx) {
            ctx.fillStyle = "white";
            ctx?.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    const setupGameReset = () => {
        if (!hasAddedEventListenersForRestart) {
            hasAddedEventListenersForRestart = true;

            setTimeout(() => {
                window.addEventListener('keydown', keyReset, {once: true});
                window.addEventListener('touchstart', reset, {once: true});
            }, 200);
        }
    }

    const reset = (event: Event) => {
        event.stopPropagation();
        hasAddedEventListenersForRestart = false;
        gameOver = false;
        waitingToStart = false;
        setFirstTime(false);
        ground?.reset();
        obstacleController?.reset();
        gameSpeed = GAME_SPEED_START;
    }

    const keyReset = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            event.preventDefault();
            reset(event);
        } else {
            window.addEventListener('keydown', keyReset, {once: true});
        }
    }

    const updateGameSpeed = (frameTimeDelta: number) => {
        gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
    }

    const showStartingGameText = () => {
        if (ctx) {
            const fontSize = 40 * getScaleRatio();
            ctx.font = `${fontSize}px PoiretOne`;
            ctx.fillStyle = "#797979ff";
            const x = canvas.width / 7;
            const y = canvas.height / 2;
            ctx.fillText("Tap Screen or Press Space to Start", x, y);
        }
    }

    const showGameOverText = () => {
        if (ctx) {
            const fontSize = 70 * getScaleRatio();
            ctx.font = `${fontSize}px PoiretOne`;
            ctx.fillStyle = "#797979ff";
            const x = canvas.width / 4;
            const y = canvas.height / 2;
            ctx.fillText("GAME OVER", x, y);
        }
    }

    const gameLoop = (currentTime: number) => {
        if (previousTime === null) {
            previousTime = currentTime;
            requestAnimationFrame(gameLoop);
            return;
        }
        const frameTimeDelta = currentTime - previousTime;
        previousTime = currentTime;
        clearScreen();


        if (!gameOver && !waitingToStart) {
            //Update game objects
            obstacleController?.update(gameSpeed, frameTimeDelta);
            ground?.update(gameSpeed, frameTimeDelta);
            player?.update(gameSpeed, frameTimeDelta);
            updateGameSpeed(frameTimeDelta);
        }

        if (!gameOver && player && obstacleController?.collideWith(player)) {
            gameOver = true;
            gameOverCounter = 100;
            instructionCounter = 100;
            setupGameReset();
        }

        //Draw game objects
        ground?.draw();
        obstacleController?.draw();
        player?.draw();

        if (gameOver && gameOverCounter > 0) {
            showGameOverText();
            --gameOverCounter;
        } else if (gameOver && instructionCounter > 0) {
            showStartingGameText();
        }

        if (firstTime) {
            showStartingGameText();
        }

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);

    window.addEventListener('keydown', keyReset, {once: true, capture: true});
    window.addEventListener('touchstart', reset, {once: true, capture: true});


    return (
        <div>
            <canvas id="game"></canvas>
        </div>
    )
}

export default Game;
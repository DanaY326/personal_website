import { useState, useEffect } from 'react';
import './game.css'

const Game = () => {
    const character = document.getElementById('character');
    const block = document.getElementById('block');
    const game = document.getElementById('game');
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState(-1);

    const jump = () => {
        if (!isPlaying) return;
        if(!character.classList.contains('animate')){
            character.classList.add('animate');
        }
        setTimeout(() => {
            character.classList.remove('animate');
        }, 500);
    }

    const onSpaceDown = (e: React.KeyboardEvent<Element>) => {
        if (e.key == " ") {
            e.preventDefault();
            console.log("hehe");
            jump();
        }
    }
    useEffect(() => {
        window.addEventListener('click', jump);
        return () => {
            window.addEventListener('click', jump);
        }
    }, [jump])

    useEffect(() => {
        if (isPlaying) {
            // if (!block.classList.contains('animate-block')) {
            //     block.classList.add('animate-block');
            // }
            setIntervalId(setInterval(() => {
                const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
                const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
                if(blockLeft < 20 && blockLeft > 0 && characterTop >= 130){
                    alert('Game Over');
                    setIsPlaying(false);
                    block.style.display = 'none'; 
                    block.classList.remove('animate-block');
                };
            }, 1));
            const randomAnimate = () => {
                if (isPlaying) {
                    block.style.display = 'block';
                    setTimeout(() => block.classList.add('animate-block'), 2);
                    const randomNum =  Math.floor(Math.random() * 2000);
                    setTimeout(() => {
                        block.style.display = 'none'; 
                        block.classList.remove('animate-block'); 
                        setTimeout(() => {
                            randomAnimate();
                        }, randomNum + 2000);
                    }, 2000);
                } else {
                    block.style.display = 'none'; 
                    block.classList.remove('animate-block'); 
                }
            }
            randomAnimate();
        } else {
            clearInterval(intervalId);
            setIntervalId(-1);
        }
    }, [isPlaying])

    return (
        <div id="game" onKeyDown={onSpaceDown}>
          <div id="character"></div>
          <div id="block"></div>
          {isPlaying ? <></>  : <button className='play' onClick={(e) => {e.stopPropagation(); setIsPlaying(true)}}>Play</button>}
        </div>
    )
}

export default Game;
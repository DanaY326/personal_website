import { useState, useEffect } from "react"
import linkedinLogo from './assets/linkedin.png'
import githubLogo from './assets/github.png'
import goosePic from './assets/goose.png'
import gooseSign from './assets/goose_sign.jpg'
import gooseFamily from './assets/alu.png'
import './App.css'
import './index.css'
import "./assets/fonts/PlaywriteCUGuides-Regular.ttf";
import Popup from "./components/Popup"
import Game from "./components/Game"

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <img src={gooseFamily} className="photo" alt="Aggressive geese sign" />
        <img src={gooseSign} className="photo" alt="ALU diagram" />
        <p>I'm studying Computer Science at the University of Waterloo. The Canadian goose is our unofficial mascot (they're everywhere!).</p>
      </Popup>
      <div  style={{filter: isPopupOpen ? 'blur(1.5px)' : ''}}>
        <div>
          <a href="https://www.linkedin.com/in/dana-yuan/" target="_blank">
            <img src={linkedinLogo} className="logo linkedin" alt="LinkedIn logo" />
          </a>
          <a href="https://www.github.com/DanaY326" target="_blank">
            <img src={githubLogo} className="logo github" alt="GitHub logo" />
          </a>
        <button onClick={openPopup}>
          <img src={goosePic} className="logo github" alt="Goose picture" style={{/*filter: 'blur(0.5px)'*/}} />
        </button>
        </div>
        <Game/>
        <div>
          <h1 className="bio riverHack">Hi, I'm Dana!</h1>
          <p className="bio marker">I love building software. I also love drawing (badly).</p>
          <p className="bio marker">Click on my doodles to find out more!</p>
        </div>
      </div>
    </div>
  )
}

export default App

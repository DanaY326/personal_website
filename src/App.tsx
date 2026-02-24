import { useState, useEffect } from "react"
import linkedinLogo from './assets/linkedin.png'
import githubLogo from './assets/github.png'
import goosePic from './assets/goose.png'
import gooseSign from './assets/goose_sign.jpg'
import alu from './assets/alu.png'
import home from './assets/home.png'
import mail from './assets/mail.png'
import portfolio_closed from './assets/portfolio-closed.png'
import portfolio_opened from './assets/portfolio-opened.png'
import bug from './assets/game/bug.png'
import './App.css'
import './index.css'
import "./assets/fonts/PlaywriteCUGuides-Regular.ttf";
import Popup from "./components/Popup"
import Game, {getScaleRatio} from "./components/Game2"
import Projects from "./components/Projects"
import ProjectDescriptions from "./components/ProjectDescriptions"

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isGamePopupOpen, setIsGamePopupOpen] = useState(false);
  const [openProject, setOpenProject] = useState("");
  const [isFirstTimeOpeningProjects, setIsFirstTimeOpeningProjects] = useState(true);
  const [isFirstTimeOpeningGame, setIsFirstTimeOpeningGame] = useState(true);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  }

  // console.log(typeof openPopup)

  return (
    <div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <img src={alu} className="photo" title="ALU diagram homework" alt="ALU diagram homework" />
        <img src={gooseSign} className="photo" title="My friend got attacked by one..." alt="Aggressive geese sign" />
        <p>I'm studying Computer Science at the University of Waterloo. I've taken courses in bash/shell scripting, DSA, design patterns, OOP and low-level programming. The Canadian goose is UWaterloo's unofficial mascot (they're EVERYWHERE!).</p>
      </Popup>
      <Popup isOpen={isFirstTimeOpeningProjects && isProjectsOpen} onClose={() => setIsFirstTimeOpeningProjects(false)}>
        <p>These are all of my projects. Click on their names to find out more!</p>
      </Popup>
      <Popup isOpen={isFirstTimeOpeningGame && isGamePopupOpen} onClose={() => setIsFirstTimeOpeningGame(false)}>
        <p>This bug wants to infect my favorite programming languages and frameworks. Help me keep the bug away!</p>
      </Popup>
      <ProjectDescriptions openProjectName={openProject} closeProject={() => setOpenProject("")}/>
      <div  style={{filter: isPopupOpen || openProject !== "" ? 'blur(1.5px)' : ''}}>
        <div className="navbar">
          {/* <button onClick={() => setIsProjectsOpen(false)}>
            <img src={home} title="Home" className="logo github" alt="Home button" />
          </button> */}
          <button onClick={() => toggleProjects()}>
            {isProjectsOpen ?  
            <img src={portfolio_opened} title="Projects" className="logo github" alt="Projects button"/>: 
            <img src={portfolio_closed} title="Projects" className="logo projects" alt="Image of open portfolio"/>}
          </button>
          <button onClick={openPopup}>
            <img src={goosePic} title="Education" className="logo github" alt="Goose picture" style={{/*filter: 'blur(0.5px)'*/}} />
          </button>
          <a href="https://www.linkedin.com/in/dana-yuan/" target="_blank">
            <img title="LinkedIn" src={linkedinLogo} className="logo linkedin" alt="LinkedIn logo" />
          </a>
          <a href="https://www.github.com/DanaY326" target="_blank">
            <img title="GitHub" src={githubLogo} className="logo github" alt="GitHub logo" />
          </a>
          <a href="mailto:dana.z.yuan@gmail.com" target="_blank">
            <img title="Email me" src={mail} className="logo github" alt="GitHub logo" />
          </a>
        </div>
        <div style={{display: isProjectsOpen ? "none" : "block"}}>
          {isFirstTimeOpeningGame && 
          <div className="game">
            <button onClick={() => setIsGamePopupOpen(true)} className="innerButton">
              <img src={bug} title="Skills" className="logo projects bug" alt="Bug picture"/>
            </button>
          </div>}
          <div style={{display: isFirstTimeOpeningGame ? "none" : "block"}}>
            <Game/>
          </div>
          <div>
            <h1 className="bio riverHack">Hi, I'm Dana!</h1>
            <p className="bio marker">I love building software. I also love drawing (badly).</p>
            <p className="bio marker">Click on my doodles to find out more!</p>
            {/* <p className="bio marker">[Written in React and deployed through Kubernetes]</p> */}
          </div>
        </div>
        <div style={{display: isProjectsOpen ? "block" : "none"}}>
          <Projects openProject={setOpenProject}/>
        </div>
      </div>
    </div>
  )
}

export default App

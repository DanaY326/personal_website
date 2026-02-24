import './projects.css'

const projectList = [
    "PDF vector search",
    "AI Agent Builder",
	"Deepmind Landing Page Clone",
	"BridgeTO",
	"Logo Scanning Education App",
	"Python ML Projects",
    "Midnight Sun Rayce Car Team"
]

const Projects = ({openProject}) => {
    // console.log(typeof openProject);
    return (
        <div className="project-container">
            {projectList.map((name: string) => {
                return (
                    <button className="project-button" title="Click me" onClick={() => openProject(name)}>
                        <p className="marker github project-button-text">{name}</p>
                    </button>
                );
            })}
        </div>
    )
}

export default Projects;
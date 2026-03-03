import './projects.css'

const projectList = [
    "PDF Vector Search",
    "AI Agent Builder",
	"Google AI Landing Page Clone",
	"BridgeTO",
	"Logo Scanning Education App",
	"Python ML Projects",
    "Midnight Sun Rayce Car Team",
    "This Website"
]

const Projects = (props: {openProject: React.Dispatch<React.SetStateAction<string>>}) => {
    const {openProject} = props;
    return (
        <div className="project-container">
            {projectList.map((name: string, index: number) => {
                return (
                    <button className="project-button" title="Click me" onClick={() => openProject(name)} key={index}>
                        <p className="body-text black-hover project-button-text">{name}</p>
                    </button>
                );
            })}
        </div>
    )
}

export default Projects;
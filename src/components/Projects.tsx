import './projects.css'
import { projectList } from './ProjectDescriptions';
import type { projectInfo } from './ProjectDescriptions';

const Projects = (props: {openProject: React.Dispatch<React.SetStateAction<string>>}) => {
    const {openProject} = props;
    return (
        <div className="project-container">
            {projectList.map((project: projectInfo, index: number) => {
                return (
                    <button className="project-button" title="Click me" onClick={() => openProject(project.name)} key={index}>
                        <p className="body-text black-hover project-button-text" style={{textAlign: 'center'}}>{project.name}</p>
                    </button>
                );
            })}
        </div>
    )
}

export default Projects;
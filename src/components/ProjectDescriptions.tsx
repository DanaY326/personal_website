import './projectDescriptions.css'
import Popup from './Popup'
import link from '../assets/link.png'
import link_purple from '../assets/link-purple.png'

interface projectInfo {
    name: string, 
    description: string,
    videoUrl?: string,
    url?: string,
    url2?: string
}

const projectList: projectInfo[] = [
    {
        name:"AI Agent Builder",
        description: "As part of my previous internship, I built and deployed a GUI for LangChain, a tool used to build AI agent workflows. Some functionalities that I supported were vector databases, MCP servers and LLM APIs. This significantly streamlined the workflow for adding AI features to the company's medical software."
    },
    {
        name: "PDF Vector Search", 
        description: "I made a web app that allows users to perform semantic search through the images and text in PDFs, where similar images and words to the search phrase are found. To do so, I used a HuggingFace library to create a RAG pipeline, which powers a vector search function. I wanted to learn about machine learning concepts and semantic/vector search.", 
        videoUrl: "https://www.youtube.com/embed/uokCXtcg0_w",
        url: "https://github.com/DanaY326/pdf-vector-search"
    },
	{
        name: "Google AI Landing Page Clone",
        description: "I reverse-engineered the frontpage of Google Deepmind and added a Gemini chatbot. This was my first web development project and I specifically wanted to learn about frontend and React.",
        videoUrl: "https://www.youtube.com/embed/fmrNWGYIJAA",
        url: "https://github.com/DanaY326/home-page"
    },
	{
        name:"BridgeTO",
        description: "Me and a few teammates made a prototype for a website that serves as an event board supporting underrepresented groups. We added features such as a searchable wiki providing information on underserved groups in the city, and a map with organizations and groups. Some of our code was used for a real church organization.",
        videoUrl: "https://www.youtube.com/embed/bL99iHmmFQ0",
        url: "https://github.com/DanaY326/BridgeTO"
    },
	{
        name:"Logo Scanning Education App",
        description: "I wanted to learn how to use React Native Expo. I made a mobile game for a hackathon that lets kids buy and sell 'Wealthlings', monsters that represent stocks. Users can take pictures of logos in their environment and get the corresponding stock. The health of each Wealthling mirrors the real-time movement of those stocks on the market using YFinance.",
        videoUrl: "https://www.youtube.com/embed/6vxH_ES7E5o",
        url: "https://github.com/nkaruna09/Wealthlings"
    },
	{
        name:"Python ML Projects",
        description: "I did the classic projects in Python machine learning as a learning experience: image recognition on handwritten numbers, and sentiment analysis on film reviews.",
        url: "https://github.com/DanaY326/rnn-lstm",
        url2: "https://github.com/DanaY326/pytorch-cnn"
    },
    {
        name:"Midnight Sun Rayce Car Team",
        description: "I'm contributing to the firmware for a solar race car design team at UWaterloo. It's been a great learning experience applying what I learned in class about C to the real world. Currently, I'm modifying the audio systems to use amplitude modulation to increase the volume, which is too quiet for time-sensitive functions like turn signals.",
        url: "https://www.uwmidsun.com"
    },
    {
        name:"This Website",
        description: "Written in React and TypeScript with Vite, this portfolio website was lots of fun to build! I wanted specifically to learn to deploy a website, and while this one is just a frontend website, I figured out how to deploy static sites and how to configure custom domains.",
    }
];

const ProjectDescriptions = (props: {openProjectName: string, closeProject: any}) => {
    const {openProjectName, closeProject} = props;
    const project = projectList.find((listItem: projectInfo) => {
        return openProjectName === listItem.name;
    });

    return (
        project 
        ? 
        <Popup isOpen={true} onClose={closeProject}>
            <h1 className='riverHack'>
                {project.url && !project.url2 ? 
                <a href={project.url} target="_blank" title="Open link">
                    {project.name}
                    <img src={link} className="link-icon black" alt="Open Link" />
                    <img src={link_purple} className="link-icon purple" alt="Open Link"/>
                </a> : 
                project.name}
            </h1>
            {project.url && project.url2 &&
                <p className='riverHack mini-link'>
                    <a href={project.url} target="_blank" title="Open link">
                        Link 1
                        <img src={link} className="link-icon black" alt="Open Link" />
                        <img src={link_purple} className="link-icon purple" alt="Open Link"/>
                    </a>
                    &nbsp;&nbsp;
                    <a href={project.url2} target="_blank" title="Open link">
                        Link 2
                        <img src={link} className="link-icon black" alt="Open Link" />
                        <img src={link_purple} className="link-icon purple" alt="Open Link"/>
                    </a>
                </p>}
            {project.videoUrl && 
            <iframe id="video"
                src={project.videoUrl}>
            </iframe>}
            <p>{project.description}</p>
        </Popup> 
        : 
        <></>
    );
}

export default ProjectDescriptions;
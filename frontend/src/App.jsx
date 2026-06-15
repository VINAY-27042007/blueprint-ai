import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [projectIdea, setProjectIdea] = useState("")
  const [projectType, setProjectType] = useState("Major Project")
  
 function generateBlueprint() {
  alert(
    "Project Type: " +
      projectType +
      "\nProject Idea: " +
      projectIdea
  )
}

 return (
  <>
    <h1>🚀 BlueprintAI</h1>
    <p>Turn any idea into a complete project blueprint.</p>

    <input

     type="text"
     placeholder="Enter your project idea..."
     value={projectIdea}
     onChange={(e) => setProjectIdea(e.target.value)}
    />
    <select
      value={projectType}
      onChange={(e) => setProjectType(e.target.value)}
>
     <option>Minor Project</option>
     <option>Major Project</option>
     <option>Hackathon</option>
     <option>Startup</option>
    </select>
  

    <button onClick={generateBlueprint}>
      Generate Blueprint
    </button>
  </>
)
}

export default App

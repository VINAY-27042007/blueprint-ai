import { useState } from 'react'
import './App.css'

function App() {
  const [projectIdea, setProjectIdea] = useState("")
  const [projectType, setProjectType] = useState("Major Project")
  const [pageCount, setPageCount] = useState("40")

  const [techStack, setTechStack] = useState("Java")
  const [teamSize, setTeamSize] = useState("1 Member")
  const [difficulty, setDifficulty] = useState("Beginner")

  function generateBlueprint() {
    alert(
      "Project Type: " + projectType +
      "\nPages: " + pageCount +
      "\nTech Stack: " + techStack +
      "\nTeam Size: " + teamSize +
      "\nDifficulty: " + difficulty +
      "\nProject Idea: " + projectIdea
    )
  }

  return (
    <div className="container">
      <h1>BlueprintAI 🚀</h1>

      <p className="subtitle">
        Turn any idea into a complete project blueprint.
      </p>

      <label>Project Idea</label>
      <input
        type="text"
        placeholder="Enter your project idea..."
        value={projectIdea}
        onChange={(e) => setProjectIdea(e.target.value)}
      />

      <label>Project Type</label>
      <select
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
      >
        <option>Minor Project</option>
        <option>Major Project</option>
        <option>Hackathon</option>
        <option>Startup</option>
      </select>

      <label>Number of Pages</label>
      <select
        value={pageCount}
        onChange={(e) => setPageCount(e.target.value)}
      >
        <option>20</option>
        <option>40</option>
        <option>60</option>
        <option>80</option>
        <option>100</option>
      </select>

      <label>Tech Stack</label>
      <select
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      >
        <option>Java</option>
        <option>Python</option>
        <option>MERN</option>
        <option>AI/ML</option>
        <option>Flutter</option>
        <option>Android</option>
      </select>

      <label>Team Size</label>
      <select
        value={teamSize}
        onChange={(e) => setTeamSize(e.target.value)}
      >
        <option>1 Member</option>
        <option>2 Members</option>
        <option>3 Members</option>
        <option>4 Members</option>
      </select>

      <label>Difficulty Level</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button onClick={generateBlueprint}>
        Generate Blueprint
      </button>
    </div>
  )
}

export default App
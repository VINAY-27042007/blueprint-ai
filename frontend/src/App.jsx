import { useState } from 'react'
import './App.css'

function App() {
  const [projectIdea, setProjectIdea] = useState("")
  const [projectType, setProjectType] = useState("Major Project")
  const [pageCount, setPageCount] = useState("40")

  const [techStack, setTechStack] = useState("Java")
  const [teamSize, setTeamSize] = useState("1 Member")
  const [difficulty, setDifficulty] = useState("Beginner")

  const [blueprint, setBlueprint] = useState("")

  function generateBlueprint() {
    const generatedText = `
Title: ${projectIdea}

Project Type: ${projectType}

Pages: ${pageCount}

Tech Stack: ${techStack}

Team Size: ${teamSize}

Difficulty: ${difficulty}

Problem Statement:
This project aims to solve real-world problems using modern technology.

Modules:
1. User Management
2. Dashboard
3. Data Processing
4. Reports

Future Scope:
Can be enhanced using AI and cloud technologies.
    `

    setBlueprint(generatedText)
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

      {blueprint && (
        <div className="output">
          <h2>Generated Blueprint</h2>
          <pre>{blueprint}</pre>
        </div>
      )}
    </div>
  )
}

export default App
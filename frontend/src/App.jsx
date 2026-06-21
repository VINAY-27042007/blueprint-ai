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
  let modules = []

  const idea = projectIdea.toLowerCase()

  if (idea.includes("attendance")) {
    modules = [
      "Student Login",
      "Faculty Login",
      "Attendance Tracking",
      "Attendance Reports"
    ]
  } else if (idea.includes("hospital")) {
    modules = [
      "Patient Records",
      "Doctor Management",
      "Appointment Booking",
      "Billing System"
    ]
  } else if (idea.includes("food")) {
    modules = [
      "Customer Login",
      "Restaurant Dashboard",
      "Order Tracking",
      "Payment Gateway"
    ]
  } else {
    modules = [
      "User Management",
      "Dashboard",
      "Data Processing",
      "Reports"
    ]
  }

  const generatedText = `
Title: ${projectIdea}

Project Type: ${projectType}

Pages: ${pageCount}

Tech Stack: ${techStack}

Team Size: ${teamSize}

Difficulty: ${difficulty}

Abstract:
${projectIdea} is a software solution designed to improve efficiency and automate processes.

Problem Statement:
Manual processes are time consuming and error prone.

Objectives:
1. Improve efficiency
2. Reduce manual work
3. Increase accuracy
4. Generate useful reports
Literature Survey:
Existing systems have limitations in scalability and automation. This project improves upon traditional approaches.

Methodology:
The system will collect data, process it, store it securely, and generate reports through a user-friendly interface.

Expected Outcomes:
1. Faster processing
2. Improved accuracy
3. Better user experience
4. Reduced manual effort

Timeline:
Phase 1 - Planning
Phase 2 - Design
Phase 3 - Development
Phase 4 - Testing
Phase 5 - Deployment

Modules:
${modules.map((m, i) => `${i + 1}. ${m}`).join("\n")}

Technology Stack:
${techStack}

Future Scope:
Can be enhanced using AI, Cloud Computing and Mobile Applications.
`

  setBlueprint(generatedText)
}
function downloadBlueprint() {
  const element = document.createElement("a")

  const file = new Blob([blueprint], {
    type: "text/plain"
  })

  element.href = URL.createObjectURL(file)
  element.download = `${projectIdea || "blueprint"}.txt`

  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
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
       <button onClick={downloadBlueprint}>
         Download Blueprint
       </button>
      )}

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
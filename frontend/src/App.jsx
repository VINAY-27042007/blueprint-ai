import { useState, useEffect } from 'react'
import { jsPDF } from "jspdf"
import './App.css'
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

function App() {
  const [projectIdea, setProjectIdea] = useState("")
  const [projectType, setProjectType] = useState("Major Project")
  const [pageCount, setPageCount] = useState("40")

  const [techStack, setTechStack] = useState("Java")
  const [teamSize, setTeamSize] = useState("1 Member")
  const [difficulty, setDifficulty] = useState("Beginner")

  const [blueprint, setBlueprint] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
  const saved = localStorage.getItem("blueprintHistory")

  if (saved) {
    setHistory(JSON.parse(saved))
  }
}, [])

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
function downloadPDF() {
  const doc = new jsPDF()

  doc.setFontSize(12)

  const lines = doc.splitTextToSize(blueprint, 180)
  doc.text(lines, 10, 10)

  doc.save(`${projectIdea || "blueprint"}.pdf`)
}
function copyBlueprint() {
  navigator.clipboard.writeText(blueprint)
  alert("Blueprint copied successfully!")
}
async function generateAIBlueprint() {
  if (!projectIdea) {
    alert("Enter a project idea first")
    return
  }

  setLoading(true)

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    })

    const prompt = `
Generate a complete project blueprint for:

${projectIdea}

Include:
1. Abstract
2. Problem Statement
3. Objectives
4. Modules
5. Methodology
6. Expected Outcomes
7. Future Scope
`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    setBlueprint(response)

const newHistory = [
  ...history,
  {
    title: projectIdea,
    content: response
  }
]

setHistory(newHistory)

localStorage.setItem(
  "blueprintHistory",
  JSON.stringify(newHistory)
)
  } catch (error) {
    console.error(error)
    alert("Error generating blueprint")
  } finally {
    setLoading(false)
  }
}
function copyBlueprint() {
  navigator.clipboard.writeText(blueprint)
  alert("Blueprint copied successfully!")
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
  Generate Template
</button>

<button
  onClick={generateAIBlueprint}
  disabled={loading}
  className="ai-btn"
>
  {loading ? "⏳ Generating AI Blueprint..." : "🤖 Generate with AI"}
</button>
      {blueprint && (
  <>
    <button onClick={downloadBlueprint}>
      Download Blueprint
    </button>

    <button onClick={downloadPDF}>
      Download PDF
    </button>

    <button onClick={copyBlueprint}>
      Copy Blueprint
    </button>
  </>
)}
<div className="history">
  <h2>Previous Blueprints</h2>

  {history.map((item, index) => (
    <button
      key={index}
      onClick={() => setBlueprint(item.content)}
    >
      {item.title}
    </button>
  ))}
</div>

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
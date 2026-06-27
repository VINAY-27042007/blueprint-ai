import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

function App() {
  const [projectIdea, setProjectIdea] = useState("");
  const [blueprint, setBlueprint] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [projectLevel, setProjectLevel] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("blueprintHistory");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  function analyzeDifficulty(idea) {
    const text = idea.toLowerCase();

    if (
      text.includes("library") ||
      text.includes("hospital") ||
      text.includes("attendance") ||
      text.includes("food") ||
      text.includes("college")
    ) {
      setProjectLevel("🟢 Beginner");
    } else if (
      text.includes("ai") ||
      text.includes("resume") ||
      text.includes("chatbot")
    ) {
      setProjectLevel("🟡 Intermediate");
    } else {
      setProjectLevel("🔴 Advanced");
    }
  }

  function suggestProjects() {
    setSuggestions([
      "Smart Attendance System",
      "Library Management System",
      "Hospital Management System",
      "AI Resume Analyzer",
      "Hostel Management System",
      "Online Food Delivery System",
      "Student Performance Tracker",
      "College Management System",
    ]);
    if (!projectIdea.trim()) {
  alert("Please enter a project idea.");
  return;
}
  }
    function generateBlueprint() {
    const generatedText = `
Title: ${projectIdea}

Difficulty:
${projectLevel}

Abstract:
${projectIdea} is a software solution designed to improve efficiency and automate processes.

Problem Statement:
Manual processes are time consuming and error prone.

Objectives:
1. Improve efficiency
2. Reduce manual work
3. Increase accuracy

Modules:
1. User Management
2. Dashboard
3. Reports

Future Scope:
Can be enhanced using AI and Cloud Computing.
`;

    setBlueprint(generatedText);

    const newHistory = [
      ...history,
      {
        title: projectIdea,
        content: generatedText,
      },
    ];

    setHistory(newHistory);

    localStorage.setItem(
      "blueprintHistory",
      JSON.stringify(newHistory)
    );
  }

  function downloadBlueprint() {
    const element = document.createElement("a");

    const file = new Blob([blueprint], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);
    element.download = `${projectIdea || "blueprint"}.txt`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function downloadPDF() {
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(blueprint, 180);

    doc.text(lines, 10, 10);

    doc.save(`${projectIdea || "blueprint"}.pdf`);
  }

  function copyBlueprint() {
    navigator.clipboard.writeText(blueprint);
    alert("Blueprint copied!");
  }
    async function generateAIBlueprint() {
    if (!projectIdea) {
      alert("Enter a project idea first");
      return;
    }

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

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
`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      setBlueprint(response);

      const filteredHistory = history.filter(
  (item) => item.title !== projectIdea
);

const newHistory = [
  {
    title: projectIdea,
    content: generatedText,
  },
  ...filteredHistory,
];

      setHistory(newHistory);

      localStorage.setItem(
        "blueprintHistory",
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.error(error);
      alert("Gemini quota/server issue. Use Generate Template.");
    } finally {
      setLoading(false);
    }
  }
    return (
    <div className="container">
      <h1>BlueprintAI 🚀</h1>

      <p className="counter">
        📊 Total Blueprints Generated: {history.length}
      </p>

      <p className="subtitle">
        Turn any idea into a complete project blueprint.
      </p>

      <label>Project Idea</label>

      <input
        type="text"
        placeholder="Enter your project idea..."
        value={projectIdea}
        onChange={(e) => {
          setProjectIdea(e.target.value);
          analyzeDifficulty(e.target.value);
        }}
      />

      {projectLevel && <h3>{projectLevel}</h3>}

      <div className="templates">
        <h3>Quick Templates</h3>

        <button
          onClick={() => {
            setProjectIdea("Library Management System");
            analyzeDifficulty("Library Management System");
          }}
        >
          📚 Library
        </button>

        <button
          onClick={() => {
            setProjectIdea("Hospital Management System");
            analyzeDifficulty("Hospital Management System");
          }}
        >
          🏥 Hospital
        </button>

        <button
          onClick={() => {
            setProjectIdea("Attendance Management System");
            analyzeDifficulty("Attendance Management System");
          }}
        >
          📝 Attendance
        </button>

        <button
          onClick={() => {
            setProjectIdea("Food Delivery System");
            analyzeDifficulty("Food Delivery System");
          }}
        >
          🍔 Food Delivery
        </button>

        <button
          onClick={() => {
            setProjectIdea("College Management System");
            analyzeDifficulty("College Management System");
          }}
        >
          🎓 College
        </button>
      </div>

      <button onClick={generateBlueprint}>
        📄 Generate Template
      </button>

      <button onClick={suggestProjects}>
        💡 Suggest Project Ideas
      </button>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3>Suggested Projects</h3>

          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setProjectIdea(item);
                analyzeDifficulty(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={generateAIBlueprint}
        disabled={loading}
        className="ai-btn"
      >
        {loading
          ? "⏳ Generating AI Blueprint..."
          : "🤖 Generate with AI"}
      </button>

      {blueprint && (
        <>
          <button onClick={downloadBlueprint}>
            📄 Download TXT
          </button>

          <button onClick={downloadPDF}>
            📕 Download PDF
          </button>

          <button onClick={copyBlueprint}>
            📋 Copy Blueprint
          </button>
        </>
      )}

      <div className="history">
        <h2>Previous Blueprints</h2>
        <input
          type="text"
          placeholder="🔍 Search previous blueprints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {history
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item, index) => (
            <div key={index} className="history-item">
              <h3>{item.title}</h3>
              <button onClick={() => setBlueprint(item.content)}>
                View Blueprint
              </button>
              <button
  onClick={() => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem(
      "blueprintHistory",
      JSON.stringify(updated)
    );
  }}
>
  🗑 Delete
</button>
            </div>
          ))}
      </div>

      {blueprint && (
        <div className="output">
          <h2>Generated Blueprint</h2>
          <pre>{blueprint}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
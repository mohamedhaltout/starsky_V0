import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FileList from "./components/FileList";
import FileViewer from "./components/FileViewer";

function App() {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  const apiKey = "AIzaSyDqacpVTXAIyDKtb5makz9n2MrOKTrzwv4";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const userPrompt = `
Create a simple responsive website using HTML, CSS, and JavaScript.

Return the result **only** as a \`\`\`json code block\`\`\`.

Each object in the array should have:
- "file": filename (e.g. "index.html")
- "content": file content

Do not explain anything. Only return JSON array in a \`\`\`json\`\`\` block.
`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt || userPrompt }] }],
      }),
    });

    const result = await response.json();
    console.log("API Response:", result);

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const match = rawText.match(/```json\s*([\s\S]*?)```/i);
    const jsonString = match ? match[1] : "[]";

    let parsed = [];

    try {
      parsed = JSON.parse(jsonString);
      setFiles(parsed);
      setSelectedFile(parsed[0]);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini:", e);
      alert("Failed to parse AI response as JSON.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    alert("Something went wrong with Gemini API.");
  }
};



  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      <Header />
      <main className="px-52 py-10">
        <HeroSection
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleSubmit}
        />

        {files.length > 0 && (
          <div className="flex gap-6 mt-10">
            <FileList files={files} selectedFile={selectedFile} onSelect={setSelectedFile} />
            <FileViewer file={selectedFile} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FileList from "./components/FileList";
import FileViewer from "./components/FileViewer";
import HowItWorksSection from "./components/HowItWorksSection";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { saveUserWebsite, getCurrentUser } from "./utils/authUtils";

import SavedWebsites from "./components/SavedWebsites";

function App() {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showGeneratedFiles, setShowGeneratedFiles] = useState(false);
  const [showSavedWebsites, setShowSavedWebsites] = useState(false);

  console.log("App State:", { isLoggedIn, showLogin, showRegister, showSavedWebsites, currentUser });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setShowLogin(false);
    setShowRegister(false);
    setShowSavedWebsites(false); // Hide saved websites on login
    // Clear generated files state and prompt on successful login
    setPrompt("");
    setFiles([]);
    setSelectedFile(null);
    setShowGeneratedFiles(false);
  };

  const handleRegisterSuccess = () => {
    alert('Registration successful! Please log in.');
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowSavedWebsites(false); // Hide saved websites on logout
    setShowGeneratedFiles(false); // Hide generated files on logout
    setFiles([]); // Clear files on logout
    setSelectedFile(null); // Clear selected file on logout
  };

  const handleFileContentChange = (fileName, newContent) => {
    setFiles(prevFiles =>
      prevFiles.map(f =>
        f.file === fileName ? { ...f, content: newContent } : f
      )
    );
    setSelectedFile(prevFile =>
      prevFile && prevFile.file === fileName ? { ...prevFile, content: newContent } : prevFile
    );
  };

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
        setShowGeneratedFiles(true);
      } catch (e) {
        console.error("Failed to parse JSON from Gemini:", e);
        alert("Failed to parse AI response as JSON.");
      }

    } catch (error) {
      console.error("Gemini API Error:", error);
      alert("Something went wrong with Gemini API.");
    }
  };

  const handleSaveWebsite = () => {
    if (currentUser && files.length > 0) {
      const websiteId = Date.now().toString(); // Simple unique ID
      const websiteName = prompt || `Website-${websiteId}`;
      const websiteData = {
        id: websiteId,
        name: websiteName,
        files: files,
        createdAt: new Date().toISOString(),
      };
      console.log("Saving website data:", websiteData);
      saveUserWebsite(currentUser.username, websiteData);
      alert('Website saved successfully!');
    } else {
      alert('No website to save or not logged in.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => { setShowLogin(true); setShowRegister(false); setShowSavedWebsites(false); }}
        onRegisterClick={() => { setShowRegister(true); setShowLogin(false); setShowSavedWebsites(false); }}
        onLogout={handleLogout}
        onViewSavedWebsites={() => { setShowSavedWebsites(true); setShowLogin(false); setShowRegister(false); setShowGeneratedFiles(false); setFiles([]); setSelectedFile(null); }}
      />
      <main className="py-10 px-4">
        {showLogin && <LoginForm onLoginSuccess={handleLoginSuccess} />}
        {showRegister && <RegisterForm onRegisterSuccess={handleRegisterSuccess} />}

        {!isLoggedIn && !showLogin && !showRegister && (
          <>
            <HeroSection
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleSubmit}
            />

            {files.length > 0 && (
              <div className="flex gap-6 mt-10">
                <FileList files={files} selectedFile={selectedFile} onSelect={setSelectedFile} />
                <FileViewer file={selectedFile} files={files} onFileContentChange={handleFileContentChange} />
              </div>
            )}
            {!showGeneratedFiles && <HowItWorksSection />}
            {!showGeneratedFiles && <CallToActionSection />}
          </>
        )}

        {isLoggedIn && showSavedWebsites ? (
          <SavedWebsites />
        ) : isLoggedIn ? (
          <>
            <HeroSection
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleSubmit}
            />

            {files.length > 0 && (
              <div className="flex gap-6 mt-10">
                <FileList files={files} selectedFile={selectedFile} onSelect={setSelectedFile} />
                <FileViewer file={selectedFile} files={files} onFileContentChange={handleFileContentChange} />
              </div>
            )}
            {isLoggedIn && files.length > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSaveWebsite}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Save Website
                </button>
              </div>
            )}
            {!showGeneratedFiles && <HowItWorksSection />}
            {!showGeneratedFiles && <CallToActionSection />}
          </>
        ) : null}
      </main>
      <Footer showGeneratedFiles={showGeneratedFiles} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserWebsites, deleteUserWebsite, updateUserWebsite } from '../utils/authUtils';
import FileList from './FileList';
import FileViewer from './FileViewer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function SavedWebsites() {
  const [currentUser, setCurrentUser] = useState(null);
  const [savedWebsites, setSavedWebsites] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      const userSavedWebsites = getUserWebsites(user.username);
      console.log("SavedWebsites component - Retrieved websites:", userSavedWebsites);
      setSavedWebsites(userSavedWebsites);
    }
  }, []);

  useEffect(() => {
    if (selectedWebsite) {
      setSelectedFile(selectedWebsite.files[0] || null);
    } else {
      setSelectedFile(null);
    }
  }, [selectedWebsite]);

  const handleDeleteWebsite = (websiteId) => {
    if (currentUser && confirm('Are you sure you want to delete this website?')) {
      deleteUserWebsite(currentUser.username, websiteId);
      setSavedWebsites(getUserWebsites(currentUser.username));
      setSelectedWebsite(null); // Deselect after deletion
    }
  };

  const handleFileContentChange = (fileName, newContent) => {
    if (selectedWebsite && currentUser) {
      const updatedFiles = selectedWebsite.files.map(f =>
        f.file === fileName ? { ...f, content: newContent } : f
      );
      const updatedWebsite = { ...selectedWebsite, files: updatedFiles };
      updateUserWebsite(currentUser.username, selectedWebsite.id, updatedWebsite);
      setSavedWebsites(getUserWebsites(currentUser.username)); // Refresh the list
      setSelectedFile(prevFile =>
        prevFile && prevFile.file === fileName ? { ...prevFile, content: newContent } : prevFile
      );
    }
  };

  const handleDownloadWebsite = async (website) => {
    if (!website || website.files.length === 0) {
      alert("No files to download for this website.");
      return;
    }

    const zip = new JSZip();
    website.files.forEach(f => {
      zip.file(f.file, f.content);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${website.name}.zip`);
  };

  const handlePreviewWebsite = (website) => {
    const htmlFile = website.files.find(f => f.file.endsWith('.html'));
    if (!htmlFile) {
      alert("No HTML file found for preview.");
      return;
    }

    let htmlContent = htmlFile.content;
    const cssFiles = website.files.filter(f => f.file.endsWith('.css'));
    const jsFiles = website.files.filter(f => f.file.endsWith('.js') || f.file.endsWith('.jsx'));

    // Inject CSS
    let styleTags = '';
    cssFiles.forEach(cssFile => {
      styleTags += `<style>${cssFile.content}</style>\n`;
    });
    htmlContent = htmlContent.replace(/<\/head>/, `${styleTags}</head>`);

    // Inject JavaScript
    let scriptTags = '';
    jsFiles.forEach(jsFile => {
      // For simplicity, embedding all JS. In a real scenario, consider order and module types.
      scriptTags += `<script>${jsFile.content}</script>\n`;
    });
    htmlContent = htmlContent.replace(/<\/body>/, `${scriptTags}</body>`);

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setShowPreview(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Your Saved Websites</h1>
      {!currentUser ? (
        <p className="text-gray-300">Please log in to view your saved websites.</p>
      ) : savedWebsites.length === 0 ? (
        <p className="text-gray-300">You haven't saved any websites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedWebsites.map((website) => (
            <div key={website.id} className="bg-zinc-800 p-4 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{website.name}</h3>
              <p className="text-gray-400 text-sm mb-4">Saved on: {new Date(website.createdAt).toLocaleDateString()}</p>
              <div className="flex-grow">
                {selectedWebsite && selectedWebsite.id === website.id && (
                  <div className="flex gap-4 mt-4">
                    <div className="w-1/3">
                      <FileList files={selectedWebsite.files} selectedFile={selectedFile} onSelect={setSelectedFile} />
                    </div>
                    <FileViewer file={selectedFile} files={selectedWebsite.files} onFileContentChange={handleFileContentChange} />
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedWebsite(selectedWebsite && selectedWebsite.id === website.id ? null : website)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  {selectedWebsite && selectedWebsite.id === website.id ? 'Hide Details' : 'View/Edit'}
                </button>
                <button
                  onClick={() => handlePreviewWebsite(website)}
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleDownloadWebsite(website)}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDeleteWebsite(website.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-11/12 h-5/6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-100">Website Preview</h2>
              <button
                onClick={() => {
                  setShowPreview(false);
                  setPreviewUrl('');
                  URL.revokeObjectURL(previewUrl); // Clean up the Blob URL
                }}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
            <iframe
              src={previewUrl}
              title="Website Preview"
              className="flex-grow border-0 rounded-md"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedWebsites;
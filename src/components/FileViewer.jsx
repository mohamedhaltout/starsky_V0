import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register languages for highlighting
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'; // For HTML
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('html', xml);
SyntaxHighlighter.registerLanguage('css', css);

function FileViewer({ file, files, onFileContentChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (file) {
      setEditedContent(file.content);
    }
  }, [file]);
 const handleEdit = () => {
   setIsEditing(true);
 };

 const handleSave = () => {
   setIsEditing(false);
   if (onFileContentChange && file) {
     onFileContentChange(file.file, editedContent);
   }
 };

 const handleDownload = async () => {
   if (!files || files.length === 0) {
     alert("No files to download.");
     return;
   }

   const zip = new JSZip();
   files.forEach(f => {
     zip.file(f.file, f.content);
   });

   const zipBlob = await zip.generateAsync({ type: "blob" });
   saveAs(zipBlob, "website.zip");
 };
  return (
    <div className="w-2/3">
      <h2 className="font-semibold mb-2 text-gray-300">File Content:</h2>
      {file ? (
        isEditing ? (
          <textarea
            className="bg-[#1E2024] p-4 rounded-md shadow text-sm text-gray-100 font-mono h-full w-full overflow-auto resize-none"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="20"
          />
        ) : (
          <div className="bg-[#1E2024] p-4 rounded-md shadow text-sm text-gray-100 font-mono h-full overflow-auto">
            <SyntaxHighlighter language={file.file.endsWith('.jsx') ? 'javascript' : file.file.split('.').pop()} style={vs2015} showLineNumbers>
              {editedContent}
            </SyntaxHighlighter>
          </div>
        )
      ) : (
        <div className="bg-[#1E2024] p-4 rounded-md shadow text-sm text-gray-100 font-mono h-full overflow-auto">
          Select a file to preview
        </div>
      )}
      {file && (
        <div className="mt-4 flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-button-gradient text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default FileViewer;

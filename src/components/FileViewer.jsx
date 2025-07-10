function FileViewer({ file }) {
  return (
    <div className="w-2/3">
      <h2 className="font-semibold mb-2 text-gray-300">File Content:</h2>
      <div className="bg-[#1E2024] p-4 rounded-lg shadow text-sm text-gray-100 font-mono whitespace-pre-wrap h-full overflow-auto">
        {file ? file.content : "Select a file to preview"}
      </div>
    </div>
  );
}

export default FileViewer;

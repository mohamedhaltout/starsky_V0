import { getIcon } from "../utils/fileUtils.jsx";

function FileList({ files, selectedFile, onSelect }) {
  return (
    <div className="w-1/3">
      <h2 className="font-semibold mb-2 text-gray-300">Generated Files:</h2>
      <ul className="bg-[#1E2024] rounded-md shadow divide-y divide-zinc-700">
        {files.map((file, index) => (
          <li
            key={index}
            onClick={() => onSelect(file)}
            className={`cursor-pointer px-4 py-2 flex items-center hover:bg-zinc-800 ${
              selectedFile?.file === file.file ? "bg-zinc-700" : ""
            }`}
          >
            {getIcon(file.file)}
            <span className="text-gray-200">{file.file}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;

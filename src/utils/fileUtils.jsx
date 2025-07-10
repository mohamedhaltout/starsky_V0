import { Code, Hash, Braces, FileText } from "lucide-react";

export const getIcon = (filename) => {
  if (filename.endsWith(".html")) return <Code size={18} color="#FF4500" className="inline-block mr-2" />;
  if (filename.endsWith(".css")) return <Hash size={18} color="#2196F3" className="inline-block mr-2" />;
  if (filename.endsWith(".js")) return <Braces size={18} color="#FFDF00" className="inline-block mr-2" />;
  return <FileText size={18} className="inline-block mr-2" />;
};

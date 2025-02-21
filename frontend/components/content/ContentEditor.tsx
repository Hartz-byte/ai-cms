// components/content/ContentEditor.tsx
import { useState } from "react";

const ContentEditor = () => {
  const [content, setContent] = useState("");

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        ✨📝 AI-Powered Content Editor
      </h3>

      <textarea
        className="w-full h-40 mt-2 p-4 border rounded-lg bg-transparent dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition">
        Generate with AI
      </button>
    </div>
  );
};

export default ContentEditor;

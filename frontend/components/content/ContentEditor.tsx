import { useState } from "react";
import axios from "axios";
import { Button, Loader } from "@mantine/core";

const ContentEditor = () => {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate content
  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic to generate content.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/openai", {
        action: "generate",
        topic: topic,
      });

      setContent(response.data.text);
    } catch (error) {
      console.error("Content generation failed:", error);
    }

    setLoading(false);
  };

  // Clear input areas
  const handleClear = () => {
    setTopic("");
    setContent("");
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        ✨📝 AI-Powered Content Editor
      </h3>

      {/* Input for Topic */}
      <input
        type="text"
        className="w-full p-3 border rounded-lg bg-transparent dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
        placeholder="Enter a topic or prompt..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={loading}
      />

      {/* AI-Generated Content Area */}
      <textarea
        className="w-full h-40 mt-4 p-4 border rounded-lg bg-transparent dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
        placeholder="Generated content will appear here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <Button
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
          onClick={handleGenerateContent}
          disabled={loading}
        >
          {loading ? <Loader size="xs" color="white" /> : "Generate with AI"}
        </Button>

        <Button
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;

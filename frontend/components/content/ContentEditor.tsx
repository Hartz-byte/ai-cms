import { useState } from "react";
import axios from "axios";
import { Button, Loader } from "@mantine/core";

const ContentEditor = () => {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // Copy content
  const handleCopy = async () => {
    if (!content.trim()) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        ✨📝 AI-Powered Content Editor
      </h3>

      {/* Input for Topic */}
      <input
        type="text"
        className="w-full p-4 border rounded-lg bg-transparent dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
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

      {/* Buttons Row */}
      <div className="flex items-center justify-between mt-4">
        {/* Left: Generate Button */}
        <Button
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
          onClick={handleGenerateContent}
          disabled={loading}
        >
          {loading ? <Loader size="xs" color="white" /> : "Generate with AI"}
        </Button>

        {/* Right: Clear & Copy Buttons */}
        <div className="flex gap-2">
          <Button
            color="gray"
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
            onClick={handleCopy}
            disabled={loading}
          >
            {copied ? "✅" : "📋"}
          </Button>

          <Button
            color="red"
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={handleClear}
            disabled={loading}
          >
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;

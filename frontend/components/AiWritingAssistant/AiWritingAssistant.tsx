// components/AiWritingAssistant/AiWritingAssistant.tsx
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button, Loader } from "@mantine/core";
import axios from "axios";

const AiWritingAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "border border-gray-300 rounded p-2 min-h-[150px] text-black dark:text-white bg-transparent dark:bg-gray-700",
      },
    },
    immediatelyRender: false,
  });

  const handleAIAction = async (actionType: string) => {
    if (!editor) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/openai", {
        action: actionType,
        content: editor.getHTML(),
      });

      editor.commands.setContent(response.data.text);
    } catch (error) {
      console.error("AI Action Failed:", error);
    }
    setLoading(false);
  };

  const handleClear = () => {
    if (editor) editor.commands.clearContent();
  };

  const handleCopy = async () => {
    if (!editor) return;
    try {
      await navigator.clipboard.writeText(editor.getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        🤖✍️ AI Writing Assistant
      </h2>

      {isClient && editor ? (
        <EditorContent editor={editor} />
      ) : (
        <p>Loading Editor...</p>
      )}

      {/* Buttons Row */}
      <div className="flex items-center justify-between mt-4">
        {/* Left Side: AI Action Buttons */}
        <div className="flex gap-2">
          <Button
            color="blue"
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-accent transition"
            onClick={() => handleAIAction("expand")}
            disabled={loading}
          >
            {loading ? <Loader size="xs" color="white" /> : "Expand"}
          </Button>

          <Button
            color="green"
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            onClick={() => handleAIAction("rewrite")}
            disabled={loading}
          >
            {loading ? <Loader size="xs" color="white" /> : "Rewrite"}
          </Button>

          <Button
            color="yellow"
            className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
            onClick={() => handleAIAction("improve")}
            disabled={loading}
          >
            {loading ? <Loader size="xs" color="black" /> : "Improve Grammar"}
          </Button>
        </div>

        {/* Right Side: Clear & Copy Buttons */}
        <div className="flex gap-2">
          <Button
            color="gray"
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
            onClick={handleCopy}
          >
            {copied ? "✅" : "📋"}
          </Button>

          <Button
            color="red"
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={handleClear}
          >
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiWritingAssistant;

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Loader } from "@mantine/core";
import axios from "axios";

const AiWritingAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[150px] mt-2 p-4 border rounded-lg bg-transparent dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition",
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

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-modern rounded-xl transition-colors duration-300">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        AI Writing Assistant
      </h3>

      {isClient && editor ? (
        <EditorContent editor={editor} />
      ) : (
        <p className="text-black dark:text-white">Loading Editor...</p>
      )}

      <div className="flex gap-2 mt-4">
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
          className="px-6 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition"
          onClick={() => handleAIAction("improve")}
          disabled={loading}
        >
          {loading ? <Loader size="xs" color="black" /> : "Improve Grammar"}
        </Button>
      </div>
    </div>
  );
};

export default AiWritingAssistant;

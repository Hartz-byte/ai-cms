import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Loader } from "@mantine/core";
import ContentScheduler from "../ContentScheduler/ContentScheduler";
import axios from "axios";

const stopWords = new Set([
  "a",
  "an",
  "and",
  "the",
  "is",
  "in",
  "to",
  "of",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "that",
  "this",
  "it",
  "be",
  "as",
  "was",
  "were",
  "are",
]);

const extractKeywords = (text: string): string[] => {
  const words = text.toLowerCase().match(/\b\w{4,}\b/g);
  if (!words) return [];

  const wordCount: Record<string, number> = {};
  words.forEach((word) => {
    if (!stopWords.has(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  return Object.keys(wordCount)
    .sort((a, b) => wordCount[b] - wordCount[a])
    .slice(0, 5);
};

const highlightKeywords = (content: string) => {
  const keywords = extractKeywords(content);

  let highlightedContent = content;
  keywords.forEach((word) => {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    highlightedContent = highlightedContent.replace(
      regex,
      `<mark class="bg-yellow-300 px-1 rounded">${word}</mark>`
    );
  });

  return highlightedContent;
};

const AiWritingAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "border border-gray-300 rounded p-2 min-h-[150px]",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        const updatedContent = highlightKeywords(editor.getHTML());
        editor.commands.setContent(updatedContent);
      });
    }
  }, [editor]);

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

  const handleSchedule = (datetime: string) => {
    console.log("Scheduled for:", datetime);
    setScheduledPosts((prev) => [...prev, datetime]);
    alert(`✅ Post Scheduled for ${datetime}!`);
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-modern rounded-xl transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">
        AI Writing Assistant
      </h2>

      {isClient && editor ? (
        <EditorContent editor={editor} className="text-black dark:text-white" />
      ) : (
        <p>Loading Editor...</p>
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

      {/* ✅ Integrated Content Scheduler */}
      <div className="mt-6">
        <ContentScheduler onSchedule={handleSchedule} />
      </div>

      {/* ✅ Display Scheduled Posts */}
      {scheduledPosts.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
            📌 Scheduled Posts:
          </h3>
          <ul className="list-disc pl-5 text-black dark:text-white">
            {scheduledPosts.map((post, index) => (
              <li key={index}>{post}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AiWritingAssistant;

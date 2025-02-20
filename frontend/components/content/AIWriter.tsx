import { useState } from "react";
import { generateAIContent } from "../../services/aiService";

const AIWriter = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    const response = await generateAIContent(prompt);
    setOutput(response.content);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">AI Writing Assistant</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your content idea..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleGenerate}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate with AI
      </button>
      {output && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-md font-semibold">Generated Content:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default AIWriter;

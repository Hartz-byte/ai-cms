// components/content/ScheduleAssistant.tsx
import { useState } from "react";
import { getOptimalSchedule } from "../../services/aiService";

const ScheduleAssistant = () => {
  const [content, setContent] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");

  const handleSchedule = async () => {
    if (!content) return alert("Please enter content.");
    try {
      const response = await getOptimalSchedule(content);
      setSuggestedTime(response.optimalTime);
    } catch (error) {
      alert("Failed to fetch AI suggestions.");
    }
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        🤖📅 AI Content Scheduling
      </h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content..."
        className="w-full p-4 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
      />
      <button
        onClick={handleSchedule}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
      >
        Get Optimal Time
      </button>

      {suggestedTime && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="font-medium">Suggested Time:</p>
          <p>{suggestedTime}</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleAssistant;

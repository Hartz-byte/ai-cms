// components/content/ScheduleAssistant.tsx
import { useState } from "react";
import { getOptimalSchedule } from "../../services/aiService";

const ScheduleAssistant = () => {
  const [topic, setTopic] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic or title.");
      return;
    }

    setLoading(true);
    try {
      const response = await getOptimalSchedule(topic);
      setSuggestedTime(response.optimalTime);
      setHashtags(response.hashtags || []);
    } catch (error) {
      alert("Failed to fetch AI suggestions.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        🤖📅 AI Content Scheduling
      </h2>

      {/* Input for Post Topic/Title */}
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter post topic or title..."
        className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
        disabled={loading}
      />

      {/* Generate Button */}
      <button
        onClick={handleSchedule}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
        disabled={loading}
      >
        {loading ? "⏳ Analyzing..." : "Get Optimal Time"}
      </button>

      {/* Display AI Suggestions */}
      {suggestedTime && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="font-medium text-black dark:text-white">
            🕒 Best Time to Post:
          </p>
          <p className="text-gray-700 dark:text-gray-300">{suggestedTime}</p>
        </div>
      )}

      {hashtags.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="font-medium text-black dark:text-white">📢 Hashtags:</p>
          <p className="text-gray-700 dark:text-gray-300">
            {hashtags.map((tag) => `#${tag}`).join(" ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleAssistant;

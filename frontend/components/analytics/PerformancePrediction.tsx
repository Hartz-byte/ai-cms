// components/content/PerformancePrediction.tsx
import { useState } from "react";
import { predictPerformance } from "../../services/analyticsService";

const PerformancePrediction = () => {
  const [content, setContent] = useState("");
  const [prediction, setPrediction] = useState<any>(null);

  const handlePrediction = async () => {
    if (!content) return alert("Enter content for prediction.");
    try {
      const result = await predictPerformance(content);
      setPrediction(result);
    } catch (error) {
      alert("Failed to predict performance.");
    }
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard rounded-xl shadow-2xl rounded">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        🤖📊 AI Content Performance Prediction
      </h2>

      <textarea
        placeholder="Enter content for analysis..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
      />
      <button
        onClick={handlePrediction}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
      >
        Predict Performance
      </button>

      {prediction && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-md font-semibold">Prediction:</h3>
          <p>Engagement Score: {prediction.engagementScore}</p>
          <p>Reach Probability: {prediction.reachProbability}%</p>
          <p>Suggested Improvement: {prediction.suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default PerformancePrediction;

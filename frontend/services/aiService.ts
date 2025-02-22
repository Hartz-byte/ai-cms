// services/aiService.ts
import axios from "axios";

// Generate AI content suggestions
export const generateAIContent = async (prompt: string) => {
  const { data } = await axios.post("/api/ai/generate", { prompt });
  return data;
};

// Get AI-based optimal publishing time
export const getOptimalSchedule = async (topic: string) => {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "schedule", topic }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI suggestions.");
  }

  return await response.json();
};

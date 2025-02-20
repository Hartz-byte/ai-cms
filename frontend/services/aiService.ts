import axios from "axios";

// Generate AI content suggestions
export const generateAIContent = async (prompt: string) => {
  const { data } = await axios.post("/api/ai/generate", { prompt });
  return data;
};

// Get AI-based optimal publishing time
export const getOptimalSchedule = async (content: string) => {
  const { data } = await axios.post("/api/ai/schedule", { content });
  return data;
};

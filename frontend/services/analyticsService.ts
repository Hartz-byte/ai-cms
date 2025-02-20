import axios from "axios";

// Predict content performance using AI
export const predictPerformance = async (content: string) => {
  const { data } = await axios.post("/api/analytics/predict", { content });
  return data;
};

// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const COHERE_API_KEY = process.env.COHERE_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { action, content, topic } = req.body;
  let prompt = "";

  switch (action) {
    case "expand":
      prompt = `Expand on the following idea with more depth, details, and clarity while maintaining a natural and engaging tone. Provide multiple paragraphs if needed: "${content}"`;
      break;
    case "rewrite":
      prompt = `Rephrase the following text in a clearer, more professional, and natural way while preserving its original meaning. Make it sound engaging: "${content}"`;
      break;
    case "improve":
      prompt = `Refine the following text by enhancing its grammar, readability, and overall fluency while ensuring it sounds polished and natural. Provide an improved version: "${content}"`;
      break;
    case "generate":
      if (!topic) {
        return res
          .status(400)
          .json({ error: "Topic is required for generation" });
      }
      prompt = `Write a detailed, engaging, and informative article about "${topic}". The response should include an introduction, key facts, and a conclusion. Keep it structured and easy to understand. Provide multiple paragraphs.`;
      break;
    default:
      return res.status(400).json({ error: "Invalid action type" });
  }

  if (!COHERE_API_KEY) {
    return res.status(500).json({ error: "Missing Cohere API Key" });
  }

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-xlarge-nightly",
        prompt: prompt,
        max_tokens: 800, // Increased for more content
        temperature: 0.9, // More creativity
        k: 50, // Sampling for diverse output
        p: 0.8, // Helps improve diversity
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res
      .status(200)
      .json({ text: response.data.generations[0].text.trim() });
  } catch (error: any) {
    console.error("Cohere API Error:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ error: "AI Request Failed", details: error.response?.data });
  }
}

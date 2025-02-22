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

  const { action, content } = req.body;
  let prompt = "";

  switch (action) {
    case "expand":
      prompt = `Expand on the following idea with more depth, details, and clarity while maintaining a natural and engaging tone: "${content}"`;
      break;
    case "rewrite":
      prompt = `Rephrase the following text in a clearer, more professional, and natural way while preserving its original meaning: "${content}"`;
      break;
    case "improve":
      prompt = `Refine the following text by enhancing its grammar, readability, and overall fluency while ensuring it sounds polished and natural: "${content}"`;
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
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("AI response: ", response.data);

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

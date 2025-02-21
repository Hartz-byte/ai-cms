import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
      prompt = `Expand the following content: "${content}"`;
      break;
    case "rewrite":
      prompt = `Rewrite the following content in a better way: "${content}"`;
      break;
    case "improve":
      prompt = `Improve the grammar and clarity of: "${content}"`;
      break;
    default:
      return res.status(400).json({ error: "Invalid action type" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return res.status(200).json({ text: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ error: "AI Request Failed" });
  }
}

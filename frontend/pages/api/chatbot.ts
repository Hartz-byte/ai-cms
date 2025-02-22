// pages/api/chatbot.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.cohere.com/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r",
        message,
        chat_history: history || [],
      }),
    });

    const data = await response.json();
    // console.log("Cohere API Response:", data);

    res.status(200).json({ reply: data.text });
  } catch (error) {
    console.error("Error in chatbot API:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

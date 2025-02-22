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
  let maxTokens = 400;

  // Action cases
  switch (action) {
    case "expand":
      prompt = `Expand on the following idea with more depth, details, and clarity while maintaining a natural and engaging tone. Provide multiple paragraphs if needed: "${content}"`;
      maxTokens = 100;
      break;
    case "rewrite":
      prompt = `Rephrase the following text in a clearer, more professional, and natural way while preserving its original meaning. Make it sound engaging: "${content}"`;
      maxTokens = 400;
      break;
    case "improve":
      prompt = `Refine the following text by enhancing its grammar, readability, and overall fluency while ensuring it sounds polished and natural. Provide an improved version: "${content}"`;
      maxTokens = 400;
      break;
    case "generate":
      if (!topic) {
        return res
          .status(400)
          .json({ error: "Topic is required for generation" });
      }
      prompt = `Write a detailed, engaging, and informative article about "${topic}". The response should include an introduction, key facts, and a conclusion. Keep it structured and easy to understand. Provide multiple paragraphs.`;
      maxTokens = 800;
      break;
    case "seo_suggestions":
      prompt = `Generate three trending blog topics, five SEO-friendly keywords, and one unique SEO tip. Format the response as:
        Topics: [Topic1, Topic2, Topic3]
        Keywords: [Keyword1, Keyword2, Keyword3, Keyword4, Keyword5]
        SEO Tip: "Your SEO tip here."`;
      maxTokens = 300;
      break;
    case "schedule":
      if (!topic) {
        return res
          .status(400)
          .json({ error: "Topic is required for scheduling" });
      }
      prompt = `Analyze the best upcoming date and time to post content about "${topic}" based on engagement trends. The response should only suggest future times from today onwards. Also, generate five relevant hashtags for the post. Format the response as:
          Best Time: "YYYY-MM-DD hh:mm A"
          Hashtags: [#hashtag1, #hashtag2, #hashtag3, #hashtag4, #hashtag5]`;
      maxTokens = 100;
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
        max_tokens: maxTokens,
        temperature: 0.9,
        k: 50,
        p: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.generations[0].text.trim();

    // Extract data for SEO Suggestions
    const topicsMatch = generatedText.match(/Topics:\s*\[(.*?)\]/);
    const keywordsMatch = generatedText.match(/Keywords:\s*\[(.*?)\]/);
    const tipsMatch = generatedText.match(/SEO Tip:\s*"(.*?)"/);

    const topics = topicsMatch
      ? topicsMatch[1]
          .split(",")
          .map((t: string) => t.trim().replace(/^"|"$/g, ""))
      : [];

    const keywords = keywordsMatch
      ? keywordsMatch[1]
          .split(",")
          .map((k: string) => k.trim().replace(/^"|"$/g, ""))
      : [];

    const tips = tipsMatch ? tipsMatch[1] : "No tip available";

    // Extract data for Scheduling
    const timeMatch = generatedText.match(/Best Time:\s*"(.*?)"/);
    const hashtagsMatch = generatedText.match(/Hashtags:\s*\[(.*?)\]/);

    let optimalTime = timeMatch ? timeMatch[1] : null;
    const hashtags = hashtagsMatch
      ? hashtagsMatch[1]
          .split(",")
          .map((h: string) => h.trim().replace(/^#|"/g, ""))
      : [];

    const currentTime = new Date();
    let suggestedTime = optimalTime ? new Date(optimalTime) : null;

    if (
      !suggestedTime ||
      isNaN(suggestedTime.getTime()) ||
      suggestedTime < currentTime
    ) {
      suggestedTime = new Date();
      suggestedTime.setDate(currentTime.getDate() + 1);
      suggestedTime.setHours(12, 0, 0, 0);
    }

    const formattedTime = suggestedTime.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (action === "schedule") {
      return res.status(200).json({
        optimalTime: formattedTime,
        hashtags,
        text: generatedText,
      });
    }

    return res.status(200).json({
      topics,
      keywords,
      tips,
      text: response.data.generations[0].text.trim(),
    });
  } catch (error: any) {
    console.error("Cohere API Error:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ error: "AI Request Failed", details: error.response?.data });
  }
}

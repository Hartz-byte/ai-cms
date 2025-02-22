// components/content/SEOOptimizer.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Loader } from "@mantine/core";

const SEOOptimizer = () => {
  const [seoSuggestions, setSeoSuggestions] = useState({
    topics: [] as string[],
    keywords: [] as string[],
    tips: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchSEOData = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/openai", {
        action: "seo_suggestions",
      });

      const { topics = [], keywords = [], tips = "" } = response.data;

      setSeoSuggestions({ topics, keywords, tips });
    } catch (error) {
      console.error("Failed to fetch SEO suggestions:", error);
      setSeoSuggestions({
        topics: [],
        keywords: [],
        tips: "Unable to generate SEO tips. Try again later.",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSEOData();
  }, []);

  return (
    <div className="p-6 bg-card dark:bg-darkCard rounded-xl shadow-2xl">
      {/* Title and Refresh Button in a Flex Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          🚀🔍 AI-Powered SEO Suggestions
        </h2>
        <Button
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
          onClick={fetchSEOData}
          disabled={loading}
        >
          {loading ? (
            <Loader size="xs" color="white" />
          ) : (
            "🔄 Refresh Suggestions"
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {/* Trending Topics */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            🔥 Trending Topics
          </h3>
          <ul className="text-gray-700 dark:text-gray-300 mt-2 list-disc pl-4">
            {seoSuggestions.topics.length > 0 ? (
              seoSuggestions.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))
            ) : (
              <li>No topics available</li>
            )}
          </ul>
        </div>

        {/* Suggested Keywords */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            🔑 Suggested Keywords
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {seoSuggestions.keywords.length > 0
              ? seoSuggestions.keywords.join(", ")
              : "No keywords available"}
          </p>
        </div>

        {/* SEO Optimization Tips */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            📌 SEO Tip of the Day
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {seoSuggestions.tips || "No tip available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SEOOptimizer;

import { useState, useEffect } from "react";

const AudienceInsights = () => {
  const [aiInsights, setAiInsights] = useState<string>("Loading insights...");

  useEffect(() => {
    setTimeout(() => {
      setAiInsights(
        "Your audience engagement has increased by 20% compared to last month. Peak engagement occurs between 6 PM - 9 PM."
      );
    }, 2000);
  }, []);

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-modern rounded-xl">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Audience Insights
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Get in-depth insights into your audience engagement and demographics.
      </p>
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <p className="text-gray-900 dark:text-white">{aiInsights}</p>
      </div>
    </div>
  );
};

export default AudienceInsights;

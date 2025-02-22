// components/ContentScheduler/ContentScheduler.tsx
import React, { useState } from "react";

import ContentScheduler from "./ContentScheduler";

const Scheduler: React.FC = () => {
  const [scheduledPosts, setScheduledPosts] = useState<
    { name: string; datetime: string }[]
  >([]);

  const handleSchedule = (name: string, datetime: string) => {
    console.log("Scheduled:", name, datetime);
    setScheduledPosts((prev) => [...prev, { name, datetime }]);
    alert(`✅ Post "${name}" Scheduled for ${datetime}!`);
  };

  return (
    <div className="bg-card dark:bg-darkCard shadow-2xl rounded-xl transition-colors duration-300">
      <ContentScheduler onSchedule={handleSchedule} />

      {/* ✅ Display Scheduled Posts */}
      {scheduledPosts.length > 0 && (
        <div className="m-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
            📌 Scheduled Posts:
          </h3>
          <ul className="list-disc pl-5 text-black dark:text-white">
            {scheduledPosts.map((post, index) => (
              <li key={index}>
                <strong>{post.name}</strong> - {post.datetime}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Scheduler;

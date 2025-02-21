const CompetitorTracking = () => {
  const competitors = [
    { name: "Brand A", engagement: "85%", trending: "Yes" },
    { name: "Brand B", engagement: "75%", trending: "No" },
    { name: "Brand C", engagement: "92%", trending: "Yes" },
  ];

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-2xl rounded-xl">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        🚀 Competitor Tracking
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Track your competitors' content performance and engagement levels.
      </p>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-2 text-left text-black dark:text-white">
              Competitor
            </th>
            <th className="p-2 text-left text-black dark:text-white">
              Engagement
            </th>
            <th className="p-2 text-left text-black dark:text-white">
              Trending
            </th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp, index) => (
            <tr key={index} className="border-t dark:border-gray-700">
              <td className="p-2 text-black dark:text-white">{comp.name}</td>
              <td className="p-2 text-black dark:text-white">
                {comp.engagement}
              </td>
              <td className="p-2 text-black dark:text-white">
                {comp.trending}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorTracking;

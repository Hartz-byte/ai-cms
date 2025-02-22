// pages/content.tsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";

const ContentPage = () => {
  const { darkMode } = useDarkMode();

  const dummyContent = [
    {
      id: 1,
      title: "AI Blog Post",
      description: "A generated blog post using AI.",
      status: "Published",
    },
    {
      id: 2,
      title: "AI Product Description",
      description: "An optimized product description for e-commerce.",
      status: "Draft",
    },
    {
      id: 3,
      title: "AI Marketing Copy",
      description: "An AI-generated ad copy for social media.",
      status: "In Review",
    },
  ];

  return (
    <DashboardLayout title="Content Management">
      <div className="p-6">
        {dummyContent.length > 0 ? (
          <div className="space-y-6">
            {dummyContent.map((content) => (
              <div
                key={content.id}
                className={`p-4 rounded-lg shadow-2xl bg-white dark:bg-darkCard transition-colors duration-300 ${
                  darkMode
                    ? "bg-darkBackground text-white"
                    : "bg-background text-gray-800"
                }`}
              >
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {content.title}
                </h3>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {content.description}
                </p>
                <span
                  className={`mt-4 inline-block px-3 py-1 rounded-full text-sm ${
                    content.status === "Published"
                      ? "bg-green-500 text-white"
                      : content.status === "Draft"
                      ? "bg-yellow-400 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {content.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No content available.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContentPage;

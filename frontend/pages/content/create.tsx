import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import useDarkMode from "@/hooks/useDarkMode";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { darkMode } = useDarkMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description });
    router.push("/content");
  };

  return (
    <DashboardLayout title="Create Content">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          {/* Back Button */}
          <button
            onClick={() => router.push("/content")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            ⬅️
          </button>

          {/* Title */}
          <h2 className="text-3xl font-bold text-primary">
            Create New Content
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className="block mb-2 text-lg font-medium text-black dark:text-white">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
              required
              className="w-full p-3 rounded-lg border focus:outline-none transition bg-transparent dark:bg-gray-700 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter content description"
              required
              rows={4}
              className="w-full p-3 rounded-lg border focus:outline-none transition bg-transparent dark:bg-gray-700 text-black dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-primary transition"
          >
            Create Content
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateContent;

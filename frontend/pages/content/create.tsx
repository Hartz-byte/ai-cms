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
        <h2 className="text-3xl font-bold mb-8 text-primary">
          Create New Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label
              className={`block mb-2 text-lg font-medium ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
              required
              className={`w-full p-3 rounded-lg border focus:outline-none transition ${
                darkMode
                  ? "bg-darkBackground border-gray-600 text-white"
                  : "bg-background border-gray-300 text-gray-800"
              }`}
            />
          </div>

          <div>
            <label
              className={`block mb-2 text-lg font-medium ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter content description"
              required
              rows={4}
              className={`w-full p-3 rounded-lg border focus:outline-none transition ${
                darkMode
                  ? "bg-darkBackground border-gray-600 text-white"
                  : "bg-background border-gray-300 text-gray-800"
              }`}
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

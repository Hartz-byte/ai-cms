import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import useDarkMode from "@/hooks/useDarkMode";

const DashboardLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const { darkMode, isMounted } = useDarkMode();

  if (!isMounted) return null;

  return (
    <div
      className={`flex bg-card dark:bg-black min-h-screen transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-8 bg-card dark:bg-black space-y-6 overflow-y-auto">
        <Header title={title} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

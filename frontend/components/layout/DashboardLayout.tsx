import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex bg-card dark:bg-black min-h-screen transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-8 bg-card dark:bg-black space-y-6 overflow-y-auto ml-64">
        <Header title={title} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

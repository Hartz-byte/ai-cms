// components/layout/Sidebar.tsx
import Link from "next/link";
import {
  FaHome,
  FaChartBar,
  FaPen,
  FaMoon,
  FaSun,
  FaRobot,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useDarkMode from "@/hooks/useDarkMode";

const Sidebar = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-screen bg-background dark:bg-darkBackground 
      ${
        darkMode ? "shadow-md" : "shadow-2xl"
      } flex flex-col p-6 transition-colors duration-300`}
    >
      <h1 className="text-3xl font-bold text-primary mb-8">AI CMS</h1>

      <div className="flex-grow">
        <nav className="flex flex-col space-y-4">
          <NavItem href="/dashboard" icon={<FaHome />} label="Dashboard" />
          <NavItem href="/content" icon={<FaPen />} label="Content" />
          <NavItem href="/chat" icon={<FaRobot />} label="Chat Bot" />
          <NavItem href="/analytics" icon={<FaChartBar />} label="Analytics" />
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {mounted && (
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center justify-center gap-3 p-3 rounded-lg bg-green-600 hover:bg-primary text-white transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light" : "Dark"}{" "}
            Mode
          </button>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ href, icon, label }: any) => (
  <Link
    href={href}
    className="flex items-center gap-4 text-lg text-gray-700 dark:text-gray-300 hover:text-primary transition"
  >
    {icon} {label}
  </Link>
);

export default Sidebar;

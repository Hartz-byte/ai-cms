import Link from "next/link";
import { FaHome, FaChartBar, FaPen, FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "@/hooks/useDarkMode";

const Sidebar = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <aside className="w-64 bg-background dark:bg-darkBackground shadow-modern flex flex-col p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-primary mb-8">AI CMS</h1>

      <nav className="flex flex-col space-y-4">
        <NavItem href="/dashboard" icon={<FaHome />} label="Dashboard" />
        <NavItem href="/content" icon={<FaPen />} label="Content" />
        <NavItem href="/analytics" icon={<FaChartBar />} label="Analytics" />
      </nav>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="mt-auto flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-primary text-white transition"
      >
        {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light" : "Dark"} Mode
      </button>
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

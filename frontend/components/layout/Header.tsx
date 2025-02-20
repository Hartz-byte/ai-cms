const Header = ({ title }: { title: string }) => {
  return (
    <header className="w-full bg-card dark:bg-darkCard rounded-xl shadow p-4 flex justify-between">
      <h1 className="text-2xl font-bold text-black dark:text-white">{title}</h1>
    </header>
  );
};

export default Header;

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import "@/styles/globals.css";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-darkBackground transition-colors">
      <Head>
        <title>AI CMS</title>
      </Head>
      <h1 className="text-4xl font-bold text-gray-600 dark:text-white">
        Welcome to AI-Powered CMS
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Intelligent content management made easy.
      </p>

      {/* <Link href="/dashboard">
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
          Go to Dashboard
        </button>
      </Link> */}

      <div className="mt-6 flex gap-4">
        <Link href="/auth/auth">
          <button className="px-6 py-2 bg-blue-600 text-white rounded">
            Login / Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

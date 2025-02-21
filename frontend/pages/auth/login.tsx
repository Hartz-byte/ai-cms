import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-darkBackground transition-colors">
      <form
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

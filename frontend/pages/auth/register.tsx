import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { register } from "@/services/authService";

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-darkBackground transition-colors">
      <form
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">
          Register
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded w-full"
        >
          Register
        </button>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

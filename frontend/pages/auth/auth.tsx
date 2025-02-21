import { useState } from "react";
import { useRouter } from "next/router";
import { login, register } from "@/services/authService";

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await login(credentials)
        : await register(credentials);
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        isLogin
          ? "Invalid email or password"
          : "Registration failed. Try again."
      );
    }
  };

  const formSwitch = () => {
    setIsLogin(!isLogin);
    setCredentials({ email: "", password: "" });
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-darkBackground transition-colors">
      <form
        className="bg-white p-8 shadow-lg rounded w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-black">
          {isLogin ? "Login" : "Register"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full text-black"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <button
          type="button"
          onClick={formSwitch}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </form>

      <button
        onClick={() => router.push("/")}
        className="mt-4 p-2 text-gray-700 hover:underline text-black dark:text-white"
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default Auth;

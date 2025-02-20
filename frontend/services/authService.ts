import axios from "axios";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post("/api/auth/login", credentials);
  localStorage.setItem("token", data.token);
};

export const register = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  await axios.post("/api/auth/register", credentials);
};

export const logout = () => {
  localStorage.removeItem("token");
};

import axios from "axios";

export const createContent = async (content: object) => {
  const token = localStorage.getItem("token");
  return axios.post("/api/content", content, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchContent = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("/api/content", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

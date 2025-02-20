import { useState, useEffect } from "react";

const useFetch = (apiCall: Function) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiCall();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [apiCall]);

  return { data, loading };
};

export default useFetch;

import { useState, useEffect } from "react";

import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getApi = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageParam}`, options);
  return response.data;
};

function useVirtualList(pageNum = 1) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");

    const controller = new AbortController();
    const { signal } = controller;

    getApi(pageNum, { signal })
      .then((res) => {
        setData((prev) => [...new Set([...prev, ...res])]);
        setHasNext(Boolean(res.length));
        setIsLoading(false);
      })
      .catch((e) => {
        if (signal.aborted) return;
        setError(e.message);
      });
    return () => controller.abort();
  }, [pageNum]);

  return { data, isLoading, hasNext, error };
}

export default useVirtualList;

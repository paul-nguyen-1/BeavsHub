"use client";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

export const toggleState = (
  currentState: boolean,
  setCurrentState: (value: boolean) => void
) => {
  setCurrentState(!currentState);
};

export const useFetchData = (
  url: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
    headers?: Record<string, string>;
  }
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCaller(
          url,
          (options?.method as "GET" | "POST" | "PUT" | "DELETE") || "GET",
          options?.data,
          options?.headers
        );
        setData(result?.data);
      } catch (err) {
        setError(`Error fetching data ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export const apiCaller = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = null,
  headers: Record<string, string> = {}
): Promise<AxiosResponse | null> => {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    console.error("API call error:", error.response?.data || error.message);
    return null;
  }
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return useMemo(() => debouncedValue, [debouncedValue]);
};

export const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes} ${period}`;
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear() % 100;
  return `${month}/${day}/${year}`;
};

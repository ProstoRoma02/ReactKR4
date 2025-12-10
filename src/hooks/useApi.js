import { useCallback, useEffect, useRef, useState } from 'react';

export const useApi = (url, options = {}, { immediate = true } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef();

  const execute = useCallback(
    async (override = {}) => {
      if (!url) {
        return null;
      }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          ...override,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        if (err.name === 'AbortError') {
          return null;
        }
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [options, url],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
    return () => abortControllerRef.current?.abort();
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
};


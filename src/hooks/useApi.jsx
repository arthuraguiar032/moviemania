// src/hooks/useApi.js
import { useState, useEffect } from 'react';

const useApi = (apiCall, params = [], initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Garanta que apiCall seja uma função
        if (typeof apiCall !== 'function') {
          throw new Error('apiCall não é uma função');
        }
        const result = await apiCall(...params);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiCall, ...params]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
};

export default useApi;
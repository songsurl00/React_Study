import { useState, useEffect, useCallback } from 'react';

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message ||
        '문제가 발생했습니다. 서버에 요청을 보내는데 실패했습니다.'
    );
  }

  return resData;
};

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || '문제가 발생했습니다');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
};

export default useHttp;

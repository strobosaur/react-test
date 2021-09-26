import { useState, useEffect } from 'react';

const useFetch = (url) => {
  
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((result) => {
        if(!result.ok) {
          throw Error('No data in response');
        }
        return result.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(error.message);
          setIsPending(false);
          setError(error.message);
        }
      })

      return () => abortCont.abort();
  }, [url]);

  return {data, isPending, error};
}

export default useFetch;
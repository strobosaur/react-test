import { useState, useEffect } from 'react';

const useFetch = (url) => {
  
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then((result) => {
        if(!result.ok) {
          throw Error('No data in response');
        }
        return result.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error.message);
        setIsPending(false);
        setError(error.message);
      })
  }, [url]);

  return {data, isPending, error};
}

export default useFetch;
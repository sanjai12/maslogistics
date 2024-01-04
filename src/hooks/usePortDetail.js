import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL =
  'https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/masquote/getPacknPortsByMode';

const usePortDetails = (mode = '') => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      .get(`/${mode}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // custom hook returns value
  return {
    response: response?.responseData.map((portData) => ({
      ...portData,
      label: portData.packingName,
    })),
    error,
    loading,
  };
};

export default usePortDetails;

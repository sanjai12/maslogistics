import { useState } from 'react';
import axios from 'axios';

const useSavePortDetail = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = (portDetail) => {
    axios
      .post(
        'https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/masquote/saveQuote',
        portDetail
      )
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

  // custom hook returns value
  return {
    saveResponse: response?.responseData,
    fetchData,
    error,
    loading,
  };
};

export default useSavePortDetail;

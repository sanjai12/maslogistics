import { useState, useEffect } from "react";
import axios from "axios";

const useGetCurrencies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/masquote/getCurrencies",
          {
            auth: { 
              username: localStorage.getItem("username"),
              password: localStorage.getItem("userkey"),
            },
          }
        );
        setData(response.data?.responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetCurrencies;

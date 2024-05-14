import { useState, useEffect } from "react";
import axios from "axios";

const useGetCurrencies = () => {
  const [currencyData, setCurrencyData] = useState(null);
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
        setCurrencyData(response.data?.responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { currencyData, loading, error };
};

export default useGetCurrencies;

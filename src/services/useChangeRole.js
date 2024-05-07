import { useState } from "react";
import axios from "axios";

const useChangeRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleChanged, setRoleChanged] = useState(false);

  const changeRole = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/admin/changeRole",
        userData,
        {
          auth: { 
            username: localStorage.getItem("username"),
            password: localStorage.getItem("userkey"),
          },
        }
      );
      const token = response.data;
      setRoleChanged(true);
    } catch (error) {
      setError(error.message ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, roleChanged, changeRole };
};

export default useChangeRole;

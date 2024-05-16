import { useState } from "react";
import axios from "axios";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  const changePassword = async (userData,callback) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/api/changePassword",
        userData,
        {
          auth: { 
            username: localStorage.getItem("username"),
            password: localStorage.getItem("userkey"),
          },
        }
      );
      const token = response.data;
      localStorage.setItem("userkey",userData.newPassword)
      callback({success:true,message:token})
      setData(token);
    } catch (error) {
      callback({success:false, message:error.response.data ? error.response.data : "An error occurred"})
      setError(error.response.data ? error.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, changePassword };
};

export default useChangePassword;

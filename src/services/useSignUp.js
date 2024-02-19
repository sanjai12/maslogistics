import { useState } from "react";
import axios from "axios";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signedUp, setSignedUp] = useState(false);

  const signUp = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Assuming userData includes username, email, and password
      const response = await axios.post(
        "https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/api/signup",
        userData
      );
      // Assuming your signup endpoint returns a token upon successful signup
      const token = response.data;
      // Do something with the token, such as storing it in local storage or context
      localStorage.setItem("token", token);
      setSignedUp(true);
    } catch (error) {
      setError(error.message ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signedUp, signUp };
};

export default useSignUp;

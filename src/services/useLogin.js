import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/api/login",
        { username, password }
      );
      // Assuming your login endpoint returns a token upon successful login
      const token = response.data;
      localStorage.setItem("username", username);
      localStorage.setItem("userkey", password);
      // Do something with the token, such as storing it in local storage or context
      localStorage.setItem("token", token);
      setLoggedIn(true);
    } catch (error) {
      setError("Authentication Failed : Username or Password is not correct");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear token from local storage or context
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return { loading, error, loggedIn, login, logout };
};

export default useLogin;

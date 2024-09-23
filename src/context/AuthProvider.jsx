/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BackendClient } from "../utils/backendClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const client = new BackendClient();

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const authUser = async (token) => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await client.get(`/api/users/profile`, config);
      setAuth(data);
    } catch (err) {
      setAuth({});
      toast.error(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authUser(token);
  }, []);

  const closeSession = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, closeSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

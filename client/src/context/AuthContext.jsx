import { createContext, useEffect, useMemo, useState } from "react";
import apiClient from "../api/apiClient";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapUser = async () => {
      const token = localStorage.getItem("productivity_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Rehydrate the session on refresh so protected routes stay seamless.
        const { data } = await apiClient.get("/auth/me");
        setUser(data);
      } catch (error) {
        localStorage.removeItem("productivity_token");
      } finally {
        setLoading(false);
      }
    };

    bootstrapUser();
  }, []);

  const login = (payload) => {
    localStorage.setItem("productivity_token", payload.token);
    setUser({
      _id: payload._id,
      name: payload.name,
      email: payload.email
    });
  };

  const logout = () => {
    localStorage.removeItem("productivity_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import httpClient from "../services/httpClient";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await httpClient.get("/api/auth/me");
        if (res.data.success && res.data.user) {
          const safeUser = {
            _id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            picture: res.data.user.picture
          };
          setUser(safeUser);
          setToken("cookie_token"); // Keep isAuthenticated truthy
          localStorage.setItem("user", JSON.stringify(safeUser));
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "user" && !event.newValue) {
        setUser(null);
        setToken(null);
      }
    };
    const handleUnauthorized = () => {
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    };
    window.addEventListener("storage", handler);
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const logout = async () => {
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    try {
      await httpClient.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, token, setToken, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

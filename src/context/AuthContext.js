import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout as apiLogout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 LOAD USER ON APP START
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔐 LOGIN
  const login = (data) => {
    setUser({
      username: data.username,
      role: data.role,
      avatar: data.avatar
    });
  };

  // 🚪 LOGOUT
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
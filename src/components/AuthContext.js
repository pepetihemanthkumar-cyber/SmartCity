import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser && savedUser !== "undefined") {
        const parsedUser = JSON.parse(savedUser);

        console.log("✅ Restored User:", parsedUser);

        setUser(parsedUser);
      } else {
        setUser(null);
      }

    } catch (err) {
      console.error("❌ Error loading user:", err);

      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= LOGIN ================= */
  const login = (data) => {
    if (!data) return;

    const userData = {
      username: data.username || "",
      email: data.email || "",
      role: (data.role || "USER").toUpperCase()
    };

    console.log("🔥 LOGIN:", userData);

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    console.log("🚪 LOGOUT");

    localStorage.removeItem("user");

    // ❌ DON'T reload page
    setUser(null);
  };

  /* ================= UPDATE USER ================= */
  const updateUser = (newData) => {
    const updated = { ...user, ...newData };

    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  /* ================= PROVIDER ================= */
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
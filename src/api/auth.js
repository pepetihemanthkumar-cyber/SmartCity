import { BASE_URL } from "./config";

/* ================= TOKEN HELPERS ================= */

// ✅ Get token
export const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("🔐 TOKEN FETCHED 👉", token);
  return token;
};

// ✅ Save token
export const setToken = (token) => {
  if (token) {
    console.log("💾 TOKEN SAVED 👉", token);
    localStorage.setItem("token", token);
  }
};

// ✅ Logout
export const logout = () => {
  console.log("🚪 LOGOUT");
  localStorage.removeItem("token");
};

// ✅ Extract role from JWT
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.role || null;
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return null;
  }
};

// ✅ Check auth
export const isAuthenticated = () => {
  return !!getToken();
};


/* ================= AUTH HEADER ================= */

export const getAuthHeader = () => {
  const token = getToken();

  if (!token) {
    console.warn("❌ No token → request will fail");
    return {
      "Content-Type": "application/json",
    };
  }

  console.log("🚀 SENDING TOKEN 👉", token);

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};


/* ================= API CALLS ================= */

// 🔐 LOGIN
export const loginUser = async (username, password) => {
  try {
    console.log("📡 LOGIN API 👉", `${BASE_URL}/api/auth/login`);

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ LOGIN FAILED 👉", text);
      throw new Error(text || "Login failed");
    }

    const data = await res.json();

    if (!data || !data.token) {
      throw new Error("No token received");
    }

    setToken(data.token);

    return data;

  } catch (err) {
    console.error("❌ Login error:", err);
    throw err;
  }
};


// 📝 REGISTER
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ REGISTER FAILED 👉", text);
      throw new Error(text || "Registration failed");
    }

    return await res.json();

  } catch (err) {
    console.error("❌ Register error:", err);
    throw err;
  }
};


// 👤 GET CURRENT USER
export const getCurrentUser = async () => {
  try {
    console.log("📡 GET USER API 👉", `${BASE_URL}/api/auth/me`);

    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: getAuthHeader(),
    });

    // 🔥 TOKEN INVALID
    if (res.status === 401) {
      console.warn("⚠️ Token expired / invalid");

      logout();

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }

      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();

    return {
      username: data?.username || "",
      role: data?.role || "",
      avatar: data?.avatar || ""
    };

  } catch (err) {
    console.error("❌ Fetch user error:", err);
    return null;
  }
};
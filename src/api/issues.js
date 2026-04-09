import { BASE_URL } from "./config";

/* ================= HELPER: GET TOKEN ================= */
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("❌ No token found in localStorage");
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

/* ================= HELPER: HANDLE RESPONSE ================= */
const handleResponse = async (res) => {
  console.log("📡 STATUS 👉", res.status);

  if (res.status === 401) {
    console.error("❌ Unauthorized (401) → Token invalid or missing");
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ ERROR RESPONSE 👉", text);
    throw new Error(text || "Something went wrong");
  }

  return res.json();
};

/* ================= GET ALL ISSUES ================= */
export const getIssues = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/issues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const data = await handleResponse(res);
    console.log("✅ ISSUES DATA 👉", data);

    return data;
  } catch (error) {
    console.error("GET ISSUES ERROR:", error.message);
    return [];
  }
};

/* ================= ADD ISSUE ================= */
export const addIssue = async (issue) => {
  try {
    const res = await fetch(`${BASE_URL}/api/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(issue),
    });

    const data = await handleResponse(res);
    console.log("✅ ISSUE ADDED 👉", data);

    return data;
  } catch (error) {
    console.error("ADD ISSUE ERROR:", error.message);
    return null;
  }
};

/* ================= GET BY ID ================= */
export const getIssueById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${id}`, {
      method: "GET",
      headers: {
        ...getAuthHeader(),
      },
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("GET ISSUE BY ID ERROR:", error.message);
    return null;
  }
};

/* ================= UPDATE ISSUE ================= */
export const updateIssue = async (id, updatedData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(updatedData),
    });

    const data = await handleResponse(res);
    console.log("✅ ISSUE UPDATED 👉", data);

    return data;
  } catch (error) {
    console.error("UPDATE ISSUE ERROR:", error.message);
    return null;
  }
};

/* ================= UPDATE STATUS ================= */
export const updateIssueStatus = async (id, status) => {
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });

    const data = await handleResponse(res);
    console.log("✅ STATUS UPDATED 👉", data);

    return data;
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error.message);
    return null;
  }
};

/* ================= DELETE ISSUE ================= */
export const deleteIssue = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/issues/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(),
      },
    });

    await handleResponse(res);

    console.log("✅ ISSUE DELETED");
    return true;
  } catch (error) {
    console.error("DELETE ISSUE ERROR:", error.message);
    return false;
  }
};
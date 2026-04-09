import React, { createContext, useState, useEffect } from "react";

export const IssueContext = createContext();

export function IssueProvider({ children }) {

  const [issues, setIssues] = useState([]);

  /* ================= LOAD FROM LOCAL ================= */
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("issues")) || [];
      setIssues(stored);
    } catch (err) {
      console.error("Error loading issues", err);
      setIssues([]);
    }
  }, []);

  /* ================= ADD ISSUE ================= */
  const addIssue = (issue) => {

    if (!issue || issue.lat === undefined || issue.lng === undefined) {
      console.error("Invalid issue");
      return;
    }

    const newIssue = {
      id: Date.now(), // unique id
      title: issue.title,
      description: issue.description,
      category: issue.category || "General",
      locationName: issue.locationName,
      lat: Number(issue.lat),
      lng: Number(issue.lng),
      status: "Open",
      createdAt: new Date().toISOString()
    };

    // ✅ FIX: always use latest state
    setIssues(prev => {
      const updated = [newIssue, ...prev];

      localStorage.setItem("issues", JSON.stringify(updated)); // sync

      return updated;
    });
  };

  /* ================= DELETE ================= */
  const deleteIssue = (id) => {

    setIssues(prev => {
      const updated = prev.filter(i => i.id !== id);

      localStorage.setItem("issues", JSON.stringify(updated));

      return updated;
    });
  };

  /* ================= UPDATE ================= */
  const updateStatus = (id, status = "Resolved") => {

    setIssues(prev => {
      const updated = prev.map(i =>
        i.id === id ? { ...i, status } : i
      );

      localStorage.setItem("issues", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue, deleteIssue, updateStatus }}>
      {children}
    </IssueContext.Provider>
  );
}
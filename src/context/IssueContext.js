import React, { createContext, useState, useEffect } from "react";
import { getIssues, addIssue as apiAddIssue } from "../api/issues";

export const IssueContext = createContext();

export function IssueProvider({ children }) {

  const [issues, setIssues] = useState([]);

  /* ================= LOAD FROM BACKEND ================= */

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const data = await getIssues();
      setIssues(data || []);
    } catch (error) {
      console.error("Error loading issues:", error);
    }
  };

  /* ================= ADD ISSUE ================= */

  const addIssue = async (issue) => {

    // safety check to avoid undefined lat/lng error
    if (!issue || issue.lat === undefined || issue.lng === undefined) {
      console.error("Invalid issue location data");
      return;
    }

    const newIssue = {
      title: issue.title,
      description: issue.description,
      category: issue.category || "General",
      locationName: issue.locationName,
      lat: Number(issue.lat),
      lng: Number(issue.lng),
      status: "Open",
      createdAt: new Date().toISOString()
    };

    try {
      const saved = await apiAddIssue(newIssue);
      setIssues(prev => [...prev, saved]);
      await loadIssues();
    } catch (error) {
      console.error("Error adding issue:", error);
    }
  };

  /* ================= DELETE ISSUE ================= */

  const deleteIssue = (id) => {
    setIssues(prev => prev.filter(issue => issue.id !== id));
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = (id, status) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { ...issue, status } : issue
      )
    );
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        addIssue,
        deleteIssue,
        updateStatus
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}
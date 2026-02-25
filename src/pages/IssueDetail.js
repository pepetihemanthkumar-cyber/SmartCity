import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const issues =
    JSON.parse(localStorage.getItem("userIssues")) || [];

  const issue = issues.find(
    i => i.id.toString() === id
  );

  if (!issue) {
    return (
      <div className="container mt-5">
        <h3>Issue not found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/user")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2>📝 Issue Details</h2>

      <div className="card p-4 shadow mt-4">
        <p><strong>ID:</strong> #{issue.id}</p>
        <p><strong>Category:</strong> {issue.category}</p>
        <p><strong>Description:</strong> {issue.text}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Date:</strong> {issue.date}</p>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/user")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default IssueDetail;
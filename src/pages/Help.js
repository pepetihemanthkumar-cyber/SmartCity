import React from "react";

function Help() {
  return (
    <div className="container mt-5 pt-5 text-center">
      <h2>Help Center</h2>
      <p className="mt-3">
        If you are facing issues with the Smart City system,
        please contact support.
      </p>

      <ul className="list-group mt-3">
        <li className="list-group-item">Login Problems</li>
        <li className="list-group-item">Issue Submission Errors</li>
        <li className="list-group-item">Feedback Not Saving</li>
      </ul>
    </div>
  );
}

export default Help;
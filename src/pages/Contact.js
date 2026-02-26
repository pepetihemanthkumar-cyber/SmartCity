import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact-page">

      {/* Back Button */}
      <div className="container pt-4">
        <button
          className="btn btn-outline-light back-btn"
          onClick={() => navigate("/user")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="container contact-container">

        <h1 className="text-center mb-5 contact-title">
          📞 Contact Information
        </h1>

        <div className="contact-card">

          <h3 className="mb-4">👨‍💻 Project Members</h3>

          <div className="member">
            <p><strong>Roll No:</strong> 2400030935</p>
            <p><strong>Name:</strong> P. Hemanth Kumar</p>
            <a href="tel:9398699644" className="call-btn">
              📱 Call 9398699644
            </a>
          </div>

          <hr />

          <div className="member">
            <p><strong>Roll No:</strong> 2400030302</p>
            <p><strong>Name:</strong> K. Chiranjith Sai</p>
            <a href="tel:9581398889" className="call-btn">
              📱 Call 9581398889
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
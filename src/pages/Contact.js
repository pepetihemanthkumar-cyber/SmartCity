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
          className="btn btn-outline-dark"
          onClick={() => navigate("/user")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="container contact-container">

        <h1 className="text-center mb-5">📞 Contact Information</h1>

        <div className="contact-card">
          <h3>Project Members</h3>
          <p>2400030935 (P. Hemanth Kumar)</p>
          <p>2400030302 (K. Chiranjith Sai)</p>

          <div className="phone-section mt-4">
            <a href="tel:9398699644" className="call-btn">
              📱 Call 9398699644
            </a>

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
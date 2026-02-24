import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same styling

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Save user to localStorage (Demo purpose)
    localStorage.setItem("user", JSON.stringify(formData));

    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="right-panel" style={{ width: "100%" }}>
        <h2>Create Account</h2>
        <p>Please fill details to register</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "600"
            }}
            onClick={() => navigate("/")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
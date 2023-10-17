import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="register-container">
      <h1>Sign In</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>

        <br />

        <button type="submit">Register</button>
      </form>
      <div className="sign-in-link">
        Don't have an account? <Link to="/">Create Account</Link>
      </div>
    </div>
  );
}

export default LoginForm;

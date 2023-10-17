import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful! You can now login.");
    } catch (error) {
      alert(error.message || "Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>

        <br />

        <button onClick={handleRegister}>Register</button>
      </form>
      <div className="sign-in-link">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default RegisterForm;

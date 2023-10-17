import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      localStorage.setItem("access_token", result.token);
      setAuthenticated(true);
    } catch (error) {
      alert(error.message || "Login failed!");
    }
  };

  return (
    <div className="register-container">
      <h1>Sign In</h1>
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

        <button onClick={handleLogin}>Login</button>
      </form>
      <div className="sign-in-link">
        Don't have an account? <Link to="/">Create Account</Link>
      </div>
    </div>
  );
}

export default LoginForm;

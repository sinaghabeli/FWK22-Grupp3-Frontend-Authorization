import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./register.css";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkCookie = async () => {
      try {
        // Make a request to a server route that requires the HTTP-only cookie
        const response = await fetch("/auth/check-cookie", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.role === "exist") {
          try {
            // Make a request to the server to handle logout
            await fetch("auth/logout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });

            // Redirect to the login page
            navigate(`/login`);
          } catch (error) {
            console.error("Logout error:", error);
          }
        }
      } catch (error) {
        message.error(error);
      }
    };

    checkCookie();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      const username = data.email.split("@")[0];

      onLogin(data.role);

      if (data.token) {
        navigate(`/userpage/${username}`);
      }
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

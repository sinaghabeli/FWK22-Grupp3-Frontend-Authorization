import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./register.css";

function RegisterForm() {
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

        if (data === "exist") {
          try {
            // Make a request to the server to handle logout
            await fetch("auth/logout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });

            // Redirect to the login page
            navigate(`/`);
          } catch (error) {
            console.error("Logout error:", error);
          }
        }
      } catch (error) {
        // If the request fails, set the state to indicate that the cookie does not exist
      }
    };

    checkCookie();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      const username = data.email.split("@")[0];
      const role = data.role;

      console.log(username);
      console.log(role);

      if (data.token) {
        navigate(`/userpage/${username}/${role}`);
      }
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

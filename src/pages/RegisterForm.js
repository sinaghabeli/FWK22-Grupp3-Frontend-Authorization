import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./register.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

      // localStorage.setItem("accessToken", data.token);

      // Set the token in a cookie
      Cookies.set("authToken", data.token, { expires: 1 }); // Expires in 7 days

      // Retrieve the token from the cookie
      // const storedToken = Cookies.get("authToken");

      if (data.token) {
        navigate(`/userpage`);
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

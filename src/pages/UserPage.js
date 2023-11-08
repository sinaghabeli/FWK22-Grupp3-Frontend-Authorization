import "./userpage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function UserPage({ userData }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);

  // Access the parameters from the current route
  const { username } = useParams();

  useEffect(() => {
    if (userData === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }

    const checkCookie = async () => {
      try {
        // Make a request to a server route that requires the HTTP-only cookie
        const response = await fetch("/auth/check-cookie", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        setInfo(data.token);

        if (data.role !== "exist") {
          // If the request is successful, set the state to indicate that the cookie exists
          navigate("/login");
        }
      } catch (error) {
        // If the request fails, set the state to indicate that the cookie does not exist
      }
    };

    checkCookie();
  }, [username]);

  const handleLogout = async () => {
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
  };

  const fetchData = async () => {
    try {
      let response;
      if (admin) {
        response = await fetch("http://localhost:5001/data/all", {
          headers: { Authorization: `Bearer ${info}` },
        });
      } else {
        response = await fetch("http://localhost:5001/data/userData", {
          headers: { Authorization: `Bearer ${info}` },
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          alert("Session expired. Please login again.");
          return;
        }
        throw new Error("Failed to fetch data from backend");
      }

      const result = await response.json();

      console.log(result);
      setData(result.data);
    } catch (error) {
      alert(error.message || "Failed to fetch data");
    }
  };

  return (
    <>
      {admin ? (
        <div>
          <Helmet>
            <title>User Page</title>
            <meta
              name="description"
              content="User page after login or register"
            />
            <meta
              name="keywords"
              content="React, JavaScript, web development, secure web app, front-end development"
            />
          </Helmet>
          <h1>Admin Page! </h1>
          <button onClick={fetchData}>Get Data</button>
          <button onClick={handleLogout}>Logout</button>
          <h2> {data} </h2>
        </div>
      ) : (
        <div>
          <h1>Welcome {username}</h1>
          <button onClick={fetchData}>Get Data</button>
          <button onClick={handleLogout}>Logout</button>
          <h2> {data} </h2>
        </div>
      )}
    </>
  );
}

export default UserPage;

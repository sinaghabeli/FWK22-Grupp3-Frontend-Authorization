import "./userpage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UserPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  // Access the parameters from the current route
  const { username, role } = useParams();

  useEffect(() => {
    if (role === "admin") {
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

        if (data !== "exist") {
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
    // try {
    //   // const token = localStorage.getItem("access_token");
    //   const response = await fetch("data", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   if (!response.ok) {
    //     if (response.status === 401) {
    //       handleLogout();
    //       alert("Session expired. Please login again.");
    //       return;
    //     }
    //     throw new Error("Failed to fetch data from backend");
    //   }
    //   const result = await response.json();
    //   setData(result.data);
    //   console.log(result.data);
    // } catch (error) {
    //   alert(error.message || "Failed to fetch data");
    // }
  };

  return (
    <>
      {admin ? (
        <div>
          <h1>Admin Page! </h1>
          <button onClick={fetchData}>Fetch Data</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Welcome {username}</h1>
          <button onClick={fetchData}>Fetch Data</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default UserPage;

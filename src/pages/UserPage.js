import "./userpage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function UserPage() {
  const navigate = useNavigate();

  const token = Cookies.get("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

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
    <div>
      <h1>User Page</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserPage;

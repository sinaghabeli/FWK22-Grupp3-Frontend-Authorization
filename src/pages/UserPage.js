import "./userpage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function UserPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate(`/login`);
    }
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("accessToken");
    Cookies.remove("authToken");
    navigate(`/`);
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

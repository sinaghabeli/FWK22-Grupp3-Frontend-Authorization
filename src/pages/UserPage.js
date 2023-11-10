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

  let count = 1;

  useEffect(() => {
    const checkCookie = async () => {
      try {
        // Make a request to a server route that requires the HTTP-only cookie
        const response = await fetch("/auth/check-cookie", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        setInfo(data.token);

        if (data.role === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }

        if (data.token === "") {
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
      await fetch("/auth/logout", {
        method: "GET",
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

      setData(result.data);
    } catch (error) {
      alert(error.message || "Failed to fetch data");
    }
  };

  const getDate = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month is zero-based, so add 1
    const day = dateObject.getDate();

    const newDate = `${year}-${month}-${day}`;

    return newDate;
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
          {data ? (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={tableCellStyle}>List</th>
                  <th style={tableCellStyle}>ID</th>
                  <th style={tableCellStyle}>Email</th>
                  <th style={tableCellStyle}>Role</th>
                  <th style={tableCellStyle}>Created</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user._id} style={tableCellStyle}>
                    <td style={tableCellStyle}>{count++}</td>
                    <td style={tableCellStyle}>{user._id}</td>
                    <td style={tableCellStyle}>{user.email}</td>
                    <td style={tableCellStyle}>{user.role}</td>
                    <td style={tableCellStyle}>{getDate(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>Press on Get Data to see all users</h3>
          )}
        </div>
      ) : (
        <div>
          <h1>Welcome {username}</h1>
          <button onClick={fetchData}>Get Data</button>
          <button onClick={handleLogout}>Logout</button>
          {data ? (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={tableCellStyle}>ID</th>
                  <th style={tableCellStyle}>Email</th>
                  <th style={tableCellStyle}>Created</th>
                </tr>
              </thead>
              <tbody>
                <tr style={tableCellStyle}>
                  <td style={tableCellStyle}>{data._id}</td>
                  <td style={tableCellStyle}>{data.email}</td>
                  <td style={tableCellStyle}>{getDate(data.createdAt)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h3>Press on Get Data to get User data!</h3>
          )}
        </div>
      )}
    </>
  );
}

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default UserPage;

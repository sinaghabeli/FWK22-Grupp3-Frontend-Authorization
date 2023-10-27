import RegisterForm from "./pages//RegisterForm";
import LoginForm from "./pages/LoginForm";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    // Process the login data
    setUserData(data);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm onLogin={handleLogin} />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/userpage/:username"
            element={<UserPage userData={userData} />}
          />
          <Route path="*" element={<h1>Page not found 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import RegisterForm from "./pages//RegisterForm";
import LoginForm from "./pages/LoginForm";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userpage/:username" element={<UserPage />} />
          <Route path="*" element={<h1>Page not found 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

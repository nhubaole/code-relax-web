// import Workspace from "./components/workspace/Workspace";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./components/auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/profile/Profile";
import Navbar from "./components/home/Navbar";
import Problems from "./components/problems/Problems";
import { useState } from "react";
import Home from "./components/home/Home";
import Workspace from "./components/workspace/Workspace";
import Admin from "./pages/admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  const Layout = () => {
    const location = useLocation();

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/workspace" element={<Workspace problemId={1} />} />
          <Route
            path="/explore"
            element={<Profile onLogoutSuccess={handleLogoutSuccess} />}
          />
          <Route
            path="/login"
            element={<LogIn onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={<Profile onLogoutSuccess={handleLogoutSuccess} />}
          />
        </Routes>
        {(location.pathname !== "/workspace" && location.pathname !== "/admin") && (
          <div className="absolute top-0 left-0 w-full">
            <Navbar isLoggedIn={isLoggedIn} />
          </div>
        )}
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

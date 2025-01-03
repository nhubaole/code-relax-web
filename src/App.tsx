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
import Navbar from "./components/home/Navbar";
import Problems from "./components/problems/Problems";
import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import Workspace from "./components/workspace/Workspace";
import Admin from "./pages/admin";
import { ToastContainer } from "react-toastify";
import Explore from "./components/explore/Explore";
import LeaderBoard from "./components/leaderboard/Leaderboard";
import DetailExplore from "./components/explore/DetailExplore";
import { UserProvider } from "./context/UserContext";
import Profile from "./components/profile/Profile";
import Leaderboard from "./components/leaderboard/Leaderboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };


  const Layout = () => {
    const location = useLocation();

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/workspace" element={<Workspace/>} /> 
          <Route path="/detailexplore/:id" element={<DetailExplore isLoggedIn />} />

          <Route
            path="/explore"
            element={<Explore />}
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
           <Route path="/" element={<Home isLoggedIn/>} />
        {/* <Route path="/community" element={<Community />} /> */}
        <Route path="/leaderboard" element={<Leaderboard />} />
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
    <UserProvider>
      <Router>        
        <Layout />
        <ToastContainer />
      </Router>
    </UserProvider>
      
  );
}

export default App;

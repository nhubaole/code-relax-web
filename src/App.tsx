// import Workspace from "./components/workspace/Workspace";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./components/auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import { useAppStore } from "./store";
import { jwtDecode } from "jwt-decode";
import { customStorage } from "./utils/localStorage";
import { useCookies } from "react-cookie";


type DecodedToken = {
  exp: number; // expiration timestamp
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const isAuthenticated = !!token;
  const { clearUserInfo } = useAppStore();

  useEffect(() => {
    // Check token expiration
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
          removeCookie("token");
          clearUserInfo();
          customStorage.removeItem("currentUser");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        removeCookie("token");
        clearUserInfo();
        customStorage.removeItem("currentUser");
      }
    }
  }, [token, removeCookie, clearUserInfo]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const isAuthenticated = !!token;

  return isAuthenticated ? <Navigate to="/" /> : children;
};
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
          <Route path="/problems" element={<PrivateRoute><Problems /></PrivateRoute>} />
          <Route path="/workspace" element={<PrivateRoute><Workspace/></PrivateRoute>} /> 
          <Route path="/detailexplore/:id" element={<PrivateRoute><DetailExplore isLoggedIn /></PrivateRoute>} />

          <Route
            path="/explore"
            element={<PrivateRoute><Explore /></PrivateRoute>}
          />
          <Route
            path="/login"
            element={<AuthRoute><LogIn onLoginSuccess={handleLoginSuccess} /></AuthRoute>}
          />
          <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
          <Route
            path="/profile"
            element={<Profile onLogoutSuccess={handleLogoutSuccess} />}
          />
           <Route path="/" element={<Home isLoggedIn/>} />
        {/* <Route path="/community" element={<Community />} /> */}
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
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
        <ToastContainer />
      </Router>
      
  );
}

export default App;

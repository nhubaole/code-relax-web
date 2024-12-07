// import Workspace from "./components/workspace/Workspace";
import "react-toastify/dist/ReactToastify.css";
import LogIn from './components/auth/Login';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Profile from './components/profile/Profile';
import Navbar from './components/home/Navbar';
import Problems from './components/problems/Problems';
import { useState } from 'react';
import Home from "./components/home/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  return (    
    <Router>     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/explore" element={<Profile onLogoutSuccess={handleLogoutSuccess}/>} />
        {/* <Route path="/community" element={<Community />} /> */}
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
        <Route path="/login" element={<LogIn onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile onLogoutSuccess={handleLogoutSuccess} />} />
      </Routes>    

      <div className="absolute top-0 left-0 w-full">
        <Navbar isLoggedIn={isLoggedIn} />
      </div> 
    </Router>
  );
}

export default App;

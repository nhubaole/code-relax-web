import Home from './components/home/Home';
import Workspace from './components/workspace/Workspace';
import LogIn from './components/auth/Login';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Profile from './components/profile/Profile';
import Navbar from './components/home/Navbar';
import Problems from './components/problems/Problems';

function App() {

  return (    
    <Router>     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/explore" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>    

      <div className="absolute top-0 left-0 w-full">
        <Navbar />        
      </div> 
    </Router>
  );
}

export default App;

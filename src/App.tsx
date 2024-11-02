import Home from './components/home/Home';
import Workspace from './components/workspace/Workspace';
import LogIn from './components/auth/Login';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Profile from './components/profile/Profile';

function App() {

  return (
    // <Home/>
    //<Workspace problem={undefined}/>

    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LogIn />} />
    //     <Route path="/signup" element={<SignUp />} />
    //     {/* Các route khác */}
    //   </Routes>
    // </Router>

     <Profile/>
  );
}

export default App;

import { Link, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import UserService from "../../services/UserService";
import PasswordInput from "./InputPassword";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserContext";
interface LogInProps {
  onLoginSuccess: () => void;
}

const LogIn: React.FC<LogInProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const logInData = { email, password };

    try {
      await UserService.logIn(logInData);
      const user = await UserService.getCurrentUser();
      setCurrentUser(user);
      onLoginSuccess(); 
      navigate('/'); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Login failed! Incorrect email or password.', { position: 'top-right', autoClose: 1500 });
    }
  };

  return (
    <div className="relative ">
      <img
          className="object-cover w-full h-screen"
          src={home}
          alt="Background"
      />

      <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#ffffff] bg-opacity-5 p-8 rounded-xl shadow-2xl w-full max-w-sm">
              <h2 className="text-4xl  text-center text-[#FFFFFF] mb-10 mt-2">LOG IN</h2>
              
              <form className="space-y-6">            
                  <input
                      type="email"
                      className="w-full px-4 py-3 bg-[#FFFFFF] bg-opacity-0 border border-[#FFFFFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] placeholder-[#FFFFFF] text-[#FFFFFF]"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                      />
                  <PasswordInput
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      />
              <div className="h-1"></div>
                <button
                    type="submit"
                    onClick={handleLogIn}
                    className="w-full py-2 text-[#FFFFFF] transition duration-200 bg-green-600 rounded-md hover:bg-green-500">Log In
                </button>
              </form>

              <div className="flex mt-3 mb-4">
                  <Link to="/login" className="text-[#FFFFFF] hover:underline cursor-pointer flex-1 text-left">Forgot your password?</Link>
                  <Link to="/signup" className="text-[#FFFFFF] hover:underline cursor-pointer flex-none w-32 text-right">Sign Up</Link>
              </div>
          </div>
      </div>
    </div>   
  );
};

export default LogIn;
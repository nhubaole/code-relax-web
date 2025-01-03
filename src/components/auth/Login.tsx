import { Link, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import UserService from "../../services/UserService";
import PasswordInput from "./InputPassword";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spin } from "antd";
import { useAppStore } from "../../store";
import { useCookies } from "react-cookie";
interface LogInProps {
  onLoginSuccess: () => void;
}

const LogIn: React.FC<LogInProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useAppStore();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email or password !");
      return false;
    }
    const logInData = { email, password };
    const  userService = new UserService();
    setLoading(true);
    try {
      const res = await userService.logIn(logInData);
      const token = res.data.data.token
      setCookie("token", token, { path: "/" });
      const user = await userService.getCurrentUser(token);
      setUserInfo(user);
      toast.success("Login successfully !")
      onLoginSuccess(); 

      if(user.role === 1) {
        navigate('/admin')
      } else {
        navigate('/'); 
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Login failed! Incorrect email or password.');
    }finally {
      setLoading(false); 
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
                    className="w-full py-2 text-[#FFFFFF] transition duration-200 bg-green-600 rounded-md hover:bg-green-500"> {loading ? <Spin /> : "Đăng nhập"}
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
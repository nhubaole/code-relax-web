import { useState } from "react";
import home from "../../assets/home.png";
import PasswordInput from "./InputPassword";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { UserSignUpReq } from "../../models/user";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();    
    if (password !== confirmPassword) return alert("Password confirmation failed!");

    const signUpData: UserSignUpReq = {email, password, displayName};
    try {
      const userService = new UserService();
      await userService.signUp(signUpData);
      toast.success("Registration successful! Please login.", { position: "top-right", autoClose: 700 });
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.success(`Registration failed! ${error.response.data.message}`, { position: "top-right", autoClose: 1500 });
      } else {
        alert("Registration failed! An unknown error occurred.");
        toast.success("Registration failed! An unknown error occurred.", { position: "top-right", autoClose: 1500 });
      }
    }
  }

  return (
    <div className="relative">
      <img className="object-cover w-full h-screen" src={home} alt="Background" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#ffffff] bg-opacity-5 p-8 rounded-xl shadow-2xl w-full max-w-sm">
          <h2 className="text-4xl text-center text-[#FFFFFF] mb-6 mt-2">SIGN UP</h2>

          <form className="space-y-6" onSubmit={handleSignup}>
            <input
              type="email"
              className="w-full px-4 py-3 bg-[#FFFFFF] bg-opacity-0 border border-[#FFFFFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] placeholder-[#FFFFFF] text-[#FFFFFF]"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <PasswordInput
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#FFFFFF] bg-opacity-0 border border-[#FFFFFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] placeholder-[#FFFFFF] text-[#FFFFFF]"
              placeholder="Display name"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)} 
            />
            <div></div>
            <button
              type="submit"
              onClick={handleSignup}
              className="w-full py-2 text-[#FFFFFF] transition duration-200 bg-green-600 rounded-md hover:bg-green-500">
                Sign Up
            </button>
          </form>

          <div className="flex mt-3 ">
            <p className="text-[#FFFFFF] cursor-pointer flex-1 text-right mr-3">Have an account?</p>
            <Link to="/login" className="text-[#FFFFFF] font-bold hover:underline cursor-pointer flex-none w-32 text-left">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
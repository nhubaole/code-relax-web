import Navbar from "../home/Navbar";
import home from "../../assets/home.png";
import PasswordInput from "./inputpassword";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="relative">
        <img
            className="w-full h-[800px] object-cover"
            src={home}
            alt="Background"
        />

        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#ffffff] bg-opacity-5 p-8 rounded-xl shadow-2xl w-full max-w-sm">
            <h2 className="text-4xl  text-center text-[#FFFFFF] mb-6 mt-2">SIGN UP</h2>
            
            <form className="space-y-6">            
                <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#FFFFFF] bg-opacity-0 border border-[#FFFFFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] placeholder-[#FFFFFF] text-[#FFFFFF]"
                    placeholder="Email address"
                    required
                />

                <PasswordInput 
                    placeholder="Password"  />

                <PasswordInput 
                    placeholder="Confirm password"  />
                
                <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#FFFFFF] bg-opacity-0 border border-[#FFFFFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] placeholder-[#FFFFFF] text-[#FFFFFF]"
                    placeholder="Display name"
                    required
                />

                <div></div>
                <button
                    type="submit"
                    className="w-full py-2 text-[#FFFFFF] transition duration-200 bg-green-600 rounded-md hover:bg-green-500">
                    Sign Up
                </button>
            </form>

            <div className="flex mt-3 ">
                <p className="text-[#FFFFFF]  cursor-pointer flex-1 text-right mr-3">Have an account?</p>
                <Link to="/login" className="text-[#FFFFFF] font-bold hover:underline cursor-pointer flex-none w-32 text-left">Log In</Link>
           </div>
            
            </div>
        </div>
    
        <div className="absolute top-0 left-0 w-full">
            <Navbar />
        </div>
    </div>   
  );
};

export default SignUp;

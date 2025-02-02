import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { useUser } from "../../context/UserContext";
import { useAppStore } from "../../store";
import { USER_DEFAULT_AVATAR } from "../../utils/constants";

interface NavbarProps {
  isLoggedIn: boolean;
}
function Navbar(props: NavbarProps) {
  const { userInfo } = useAppStore(); 

  const currentPath = location.pathname;
  const currentActiveButton =
    currentPath === "/login"
      ? "login"
      : currentPath === "/signup"
      ? "signup"
      : "";

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="absolute top-0 left-0 flex justify-between items-center w-full mt-4 pb-2 h-[95px]  bg-transparent text-[#FFFFFF] px-16">
      <div className="flex items-center space-x-4">
        <div className="flex cursor-pointer" onClick={handleLogoClick}>
          <h2 className="text-2xl font-bold text-[#FFFFFF]">CODE</h2>
          <h2 className="text-2xl font-bold text-green-300">RELAX</h2>
        </div>
      </div>

      <div className="flex space-x-16 text-lg">
        <Link
          to="/"
          className={`hover:text-green-600 ${
            location.pathname === "/" ? "border-b-2 border-gray-200" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/problems"
          className={`hover:text-green-600 ${
            location.pathname === "/problems"
              ? "border-b-2 border-gray-200"
              : ""
          }`}
        >
          Problems
        </Link>
        <Link
          to="/explore"
          
          className={`hover:text-green-600 ${
            ["/explore", "/detailexplore"].includes(location.pathname)
            ? "border-b-2 border-gray-200" : ""
          }`}
        >
          Explore
        </Link>
        {/* <Link
          to="/"
          className={`hover:text-green-600 ${
            location.pathname === "/community"
              ? "border-b-2 border-gray-200"
              : ""
          }`}
        >
          Community
        </Link> */}
        <Link
          to="/leaderboard"
          className={`hover:text-green-600 ${
            location.pathname === "/leaderboard"
              ? "border-b-2 border-gray-200"
              : ""
          }`}
        >
          Leaderboard
        </Link>
      </div>

      <div className="space-x-6">
        {props.isLoggedIn ? (
          <button>
            <div
              className="flex items-center space-x-4"
              onClick={handleProfileClick}
            >              
              <span className="font-medium text-[#FFFFFF]">{userInfo?.displayName || "Anonymous"}</span>
              <img
                src={userInfo?.avatarUrl || USER_DEFAULT_AVATAR}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </button>
        ) : (
          <>
            <Link to="/login">
              <button
                className={`px-4 py-2 font-medium ${
                  currentActiveButton === "login"
                    ? "bg-[#FFFFFF]/30 text-[#FFFFFF]"
                    : "text-green-300"
                } hover:bg-[#FFFFFF]/30 rounded-3xl`}
              >
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button
                className={`px-4 py-2 font-medium ${
                  currentActiveButton === "signup"
                    ? "bg-[#FFFFFF]/30 text-[#FFFFFF]"
                    : "text-green-300"
                } hover:bg-[#FFFFFF]/30 rounded-3xl`}
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

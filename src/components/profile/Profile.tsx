import React, { useState, ChangeEvent} from "react";
import { useNavigate } from "react-router-dom";
import account from "../../assets/user-rectangle.svg";
import points from "../../assets/points.svg";
import logout from "../../assets/logout.svg";
import edit from "../../assets/pencil.svg";
import practice_history from "../../assets/practice_history.png";
import DivAccount from "./Account";
import DivPoints from "./Points";
import Footer from "./Footer";
import PracticeHistory from "./PracticeHistory";
import UserService from "../../services/UserService";
import { UserUpdateRe, UserUpdateReq } from "../../models/user";
import { useCookies } from "react-cookie";
import { useAppStore } from "../../store";
import { customStorage } from "../../utils/localStorage";
interface ProfileProps {
  onLogoutSuccess: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogoutSuccess }) => {
  const {userInfo, setUserInfo, clearUserInfo} = useAppStore();
  const [activeDiv, setActiveDiv] = useState<"account" | "points" | "practice_history">("account");
  const [selectedImage, setSelectedImage] = useState<File | string>(userInfo?.avatarUrl || ''); 
  const [previewSrc, setPreviewSrc] = useState<string>(userInfo?.avatarUrl || '');
  const [cookie, , removeCookie] = useCookies(["token"]);
  const token = cookie.token
  const navigate = useNavigate();
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file); 
      const imageUrl = URL.createObjectURL(file);
      setPreviewSrc(imageUrl);
    }
  };
  
  const convertUrlToFile = async (url: string, filename: string = 'image.png'): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob(); 
    const file = new File([blob], filename, { type: blob.type });
    return file;
  };
  
  const handleAvatar = async (selectedImage: File | string) => {
    if (selectedImage instanceof File) {
      return selectedImage; 
    }  
    return await convertUrlToFile(selectedImage);
  };

  const onUpdateSuccess = async (userUpdateRe: UserUpdateRe) => {
    const userUpdateReq: UserUpdateReq = {
      id: userUpdateRe?.id || 0,
      displayName: userUpdateRe?.displayName || "",
      email: userUpdateRe?.email || "",
      password: userUpdateRe?.password || "",
      role: userUpdateRe?.role || 0,
      google: userUpdateRe?.google || "",
      github: userUpdateRe?.github || "",
      facebook: userUpdateRe?.facebook|| "",
      avatar:  await handleAvatar(selectedImage),
  }; 
    console.log('update:',userUpdateReq);
    const userService = new UserService();
    await userService.updateUser(userUpdateReq, token);
    const updatedUser = await userService.getCurrentUser(token);
    setUserInfo (updatedUser);      
  };


  const handleLogout = () => {
    removeCookie("token");
    clearUserInfo();
    customStorage.removeItem("currentUser");
    navigate("/");
    onLogoutSuccess();
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-tl from-green-500 to-textcolorlight">
      <div className="flex flex-grow p-2 mt-28">
        {/* Sidebar */}
        <div className="flex-none px-10 w-72">
          <div className="relative">
            <img
              className="rounded-full w-[210px] h-[210px]"
              src={previewSrc}
              alt="Avatar"
            />
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center"
            >
              <label htmlFor="fileInput" className="cursor-pointer">
                <img
                  src={edit}
                  alt="Edit Icon"
                  className="inline w-10 h-10 mr-3 opacity-75"
                />
              </label>
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <h2 className="text-3xl text-center text-[#FFFFFF] mb-10 mt-4">
            {userInfo?.displayName}
          </h2>

          {/* Navigation Buttons */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveDiv("account")}
              className={`w-full text-left py-3 px-6 text-[#FFFFFF] transition duration-200 rounded-md hover:bg-green-600 ${
                activeDiv === "account" ? "bg-green-500" : ""
              }`}
            >
              <img
                src={account}
                alt="Account Icon"
                className="inline w-5 h-5 mr-3"
              />
              Account
            </button>
            <button
              type="button"
              onClick={() => setActiveDiv("points")}
              className={`w-full text-left py-3 px-6 text-[#FFFFFF] transition duration-200 rounded-md hover:bg-green-600 ${
                activeDiv === "points" ? "bg-green-500" : ""
              }`}
            >
              <img
                src={points}
                alt="Points Icon"
                className="inline w-5 h-5 mr-3"
              />
              Points
            </button>
            <button
              type="button"
              onClick={() => setActiveDiv("practice_history")}
              className={`w-full text-left py-3 px-6 text-[#FFFFFF] transition duration-200 rounded-md hover:bg-green-600 ${
                activeDiv === "practice_history" ? "bg-green-500" : ""
              }`}
            >
              <img
                src={practice_history}
                alt="Practice History Icon"
                className="inline w-5 h-5 mr-3"
              />
              Practice History
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left py-3 px-6 text-[#FFFFFF] transition duration-200 rounded-md hover:bg-green-600"
            >
              <img
                src={logout}
                alt="Logout Icon"
                className="inline w-5 h-5 mr-3"
              />
              Log Out
            </button>
          </div>
        </div>

        <div className="flex-1">
          {activeDiv === "account" ? (
            <DivAccount onUpdateSuccess={onUpdateSuccess}  />
          ) : activeDiv === "points" ? (
            <DivPoints />
          ) : (
            <PracticeHistory />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

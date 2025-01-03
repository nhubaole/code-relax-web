import {  useState } from 'react';
import facebook from "../../assets/facebook.svg";
import github from "../../assets/github.svg";
import google from "../../assets/google.svg";
import { UserUpdateRe } from '../../models/user';
import { useAppStore } from '../../store';
interface DivAccountProps {
    onUpdateSuccess: (updateData: UserUpdateRe) => void;
}
  
const DivAccount = ({ onUpdateSuccess }: DivAccountProps) => {
    const { userInfo, setUserInfo } = useAppStore(); 
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        displayName: userInfo?.displayName || "",
        email: userInfo?.email || "",
        password: userInfo?.password || "",
        google: userInfo?.google || "",
        github: userInfo?.github || "",
        facebook: userInfo?.facebook || "",
    });

    // Hàm xử lý thay đổi input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleEditClick = async () => {
        if (isEditing) {            
            try {

                const updateData: UserUpdateRe = {
                    id: userInfo?.id || 0,
                    displayName: formData.displayName || userInfo?.displayName,
                    email: formData.email || userInfo.email,
                    password: formData.password || userInfo.password,
                    role: userInfo?.role || 0,
                    google: formData.google || userInfo.google,
                    github: formData.github || userInfo.github,
                    facebook: formData.facebook || userInfo.facebook,
                };                

                console.log(updateData)
                setIsEditing(!isEditing);
                onUpdateSuccess(updateData);
            } catch (error) {
                console.error("Failed to update user:", error);
            }
        }
        else { 
            setIsEditing(!isEditing);
        }       
    };

    return (
        <div className="px-10 text-white">
            <h1 className="text-left text-[#FFFFFF] mb-4 ">Account Information</h1>                  

            <div className="bg-[#ffffff] bg-opacity-10 px-6 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                <div className="flex flex-1 p-1.5">
                    <span className="flex-none w-96 text-sm text-left text-[#FFFFFF]">DisplayName</span>   
                    <input
                        id='displayName'
                        type="text"
                        className={`w-full bg-[#FFFFFF] px-12 bg-opacity-0 text-sm border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue={userInfo?.displayName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                    />      
                </div>

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 p-1.5 w-15">
                    <span className="flex-none w-96 text-sm text-left text-[#FFFFFF]">Email</span>
                    <input
                        id='email'
                        type="text"
                        className={`w-full bg-[#FFFFFF] px-12 text-sm bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue={userInfo?.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                    />               
                </div> 

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 p-1.5 w-15">
                    <span className="flex-none text-sm w-96 text-left text-[#FFFFFF]">Password</span>
                    <input
                        id='password'
                        type="password"
                        className={`w-full bg-[#FFFFFF] px-12 text-sm bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue={userInfo?.password}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                    />   
                    
                </div>     

                
            </div>             

            <h1 className="text-left text-[#FFFFFF] mb-4 mt-8">Social Account</h1>
            
            <div className="bg-[#ffffff] bg-opacity-10 px-6 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                <div className="flex flex-1 py-1.5 px-4">
                    <img src={google} alt="Icon" className="w-6 h-6 mr-2" /> 
                    <span className="mt-0.5 flex-none text-sm w-96 text-left text-[#FFFFFF]">Google</span>   
                    <input
                        id='google'
                        type="text"
                        className={`w-full text-sm bg-[#FFFFFF]  bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        placeholder="Your Google username or url"
                        defaultValue={userInfo?.google}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                    />      
                </div>

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 py-1.5 px-4 w-15">
                    <img src={github} alt="Icon" className="w-6 h-6 mr-2" /> 
                    <span className="mt-0.5 flex-none w-96 text-sm text-left text-[#FFFFFF]">Github</span>
                    <input
                        id='github'
                        type="text"
                        className={`w-full text-sm bg-[#FFFFFF] bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        placeholder="Your Github username or url"
                        defaultValue={userInfo?.github}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                    />               
                </div>

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 py-1.5 px-4 w-15">
                    <img src={facebook} alt="Icon" className="w-6 h-6 mr-2" /> 
                    <span className="mt-0.5 flex-none w-96 text-sm text-left text-[#FFFFFF]">Facebook</span>
                    <input
                        id='facebook'
                        type="text"
                        className={`w-full text-sm bg-[#FFFFFF] bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        placeholder='Your Facebook username or url'                        
                        defaultValue={userInfo?.facebook}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                    />   
                    
                </div>     
            </div>

            <div className="flex justify-end mt-6"> 
                <button
                    id='_btnAccount'
                    type="button"
                    onClick={handleEditClick}
                    className="w-1/3 flex items-center justify-center bg-green-300 bg-opacity-70 rounded-lg px-4 py-2 text-[#FFFFFF] hover:bg-opacity-30 transition duration-200">
                    {isEditing ? "Lưu thông tin" : "Thay đổi thông tin"} 
                </button>
            </div>  
        </div>
    );
};

export default DivAccount;
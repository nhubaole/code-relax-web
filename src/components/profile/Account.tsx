import React, { useState } from 'react';
import facebook from "../../assets/facebook.svg";
import github from "../../assets/github.svg";
import google from "../../assets/google.svg";


const password = "password"; 

const DivAccount = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="px-10 text-white">
            <h1 className="text-left text-[#FFFFFF] mb-4 ">Account Information</h1>                  

            <div className="bg-[#ffffff] bg-opacity-10 px-6 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                <div className="flex flex-1 p-1.5">
                    <span className="flex-none w-96 text-sm text-left text-[#FFFFFF]">Display name</span>   
                    <input
                        id='_name'
                        type="text"
                        className={`w-full bg-[#FFFFFF] px-12 bg-opacity-0 text-sm border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue="Ha Anh"
                        readOnly={!isEditing}
                        required
                    />      
                </div>

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 p-1.5 w-15">
                    <span className="flex-none w-96 text-sm text-left text-[#FFFFFF]">Email</span>
                    <input
                        id='_email'
                        type="text"
                        className={`w-full bg-[#FFFFFF] px-12 text-sm bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue="hamaianh03@gmail.com"
                        readOnly={!isEditing}
                        required
                    />               
                </div> 

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 p-1.5 w-15">
                    <span className="flex-none text-sm w-96 text-left text-[#FFFFFF]">Password</span>
                    <input
                        id='_password'
                        type="text"
                        className={`w-full bg-[#FFFFFF] px-12 text-sm bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue={'*'.repeat(password.length)}
                        readOnly={!isEditing}
                        required
                    />   
                    
                </div>     

                
            </div>             

            <h1 className="text-left text-[#FFFFFF] mb-4 mt-8">Social Account</h1>
            
            <div className="bg-[#ffffff] bg-opacity-10 px-6 py-4 rounded-xl shadow-2xl flex-col py-4 space-y-3">
                <div className="flex flex-1 py-1.5 px-4">
                    <img src={google} alt="Icon" className="w-6 h-6 mr-2" /> 
                    <span className="mt-0.5 flex-none text-sm w-96 text-left text-[#FFFFFF]">Google</span>   
                    <input
                        id='_google'
                        type="text"
                        className={`w-full text-sm bg-[#FFFFFF]  bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue="Your Google username or url"
                        readOnly={!isEditing}
                        required
                    />      
                </div>

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 py-1.5 px-4 w-15">
                    <img src={github} alt="Icon" className="w-6 h-6 mr-2" /> 
                    <span className="mt-0.5 flex-none w-96 text-sm text-left text-[#FFFFFF]">Github</span>
                    <input
                        id='_github'
                        type="text"
                        className={`w-full text-sm bg-[#FFFFFF] bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue="Your Github username or url"
                        readOnly={!isEditing}
                        required
                    />               
                </div>

                <hr className="border-t border-green-700 border-opacity-50 my-7" />

                <div className="flex flex-1 py-1.5 px-4 w-15">
                    <img src={facebook} alt="Icon" className="w-6 h-6 mr-2" /> 
                    <span className="mt-0.5 flex-none w-96 text-sm text-left text-[#FFFFFF]">Facebook</span>
                    <input
                        id='_facebook'
                        type="text"
                        className={`w-full text-sm bg-[#FFFFFF] bg-opacity-0 border-none focus:outline-none ${isEditing ? "text-green-300" : "text-[#FFFFFF]"}`}                            
                        defaultValue='Your Facebook username or url'
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
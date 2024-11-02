import Navbar from "../home/Navbar";
import avatar from "../../assets/avatar.jpg";
import account from "../../assets/user-rectangle.svg";
import points from "../../assets/points.svg";
import edit from "../../assets/pencil.svg";
import DivAccount from "./Account";
import DivPoints from "./Points";
import { useState } from "react";
import Footer from "./Footer";

const Profile = () => {
    const [activeDiv, setActiveDiv] = useState('account');

    const [selectedImage, setSelectedImage] = useState(avatar);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Cập nhật ảnh khi file được chọn
        }
    };
    
    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-tl from-green-500 to-textcolorlight">
            
            <div className="w-full">
                <Navbar />
            </div>

            <div className="flex flex-grow p-2">
                <div className="flex-none px-10 w-72">

                    <div className="relative"> 
                        <img
                            className="w-full rounded-full"
                            src={selectedImage}
                            alt="Avatar"
                        />

                        <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center"> 
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <img src={edit} alt="Icon" className="inline w-10 h-10 mr-3 opacity-75"/>
                            </label>
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"  // Chỉ cho phép các file hình ảnh
                            className="hidden" // Ẩn input file
                            onChange={handleFileChange}  // Xử lý file khi được chọn
                        />
                    </div>

                    <h2 className="text-3xl text-center text-[#FFFFFF] mb-10 mt-4">Ha Anh</h2>

                    <div className="space-y-4">

                        <button
                            type="button"
                            onClick={() => setActiveDiv('account')}
                            className={`w-full text-left py-3 px-6 text-[#FFFFFF] transition duration-200 rounded-md hover:bg-green-600 ${activeDiv === 'account' ? 'bg-green-500' : 'bg-none'}`}>
                            <img src={account} alt="Icon" className="inline w-5 h-5 mr-3" /> 
                            Account
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveDiv('points')}
                            className={`w-full text-left py-3 px-6 text-[#FFFFFF] transition duration-200 rounded-md hover:bg-green-600 ${activeDiv === 'points' ? 'bg-green-500' : 'bg-none'}`}>
                            <img src={points} alt="Icon" className="inline w-5 h-5 mr-3" /> 
                            Points
                        </button>

                    </div>

                </div>

                <div className="flex-1">
                    {activeDiv === 'account' ? <DivAccount /> : <DivPoints />}
                </div>

            </div>
            
            <Footer />

        </div>   
    );
};

export default Profile;


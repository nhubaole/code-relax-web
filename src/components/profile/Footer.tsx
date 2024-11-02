
const Footer = () => {
    return (
        <footer className="py-10 text-gray-200 bg-gray-800 mt-36">
            <div className="container px-4 mx-auto border-t border-[#FFFFFF] border-opacity-40 ">
                <div className="flex flex-wrap justify-between mt-16">
                    
                    <div className="w-full mb-6 md:w-1/4">
                        <div className="flex">
                            <h2 className="text-xl font-semibold text-[#FFFFFF]">CODE</h2>
                            <h2 className="text-xl font-semibold text-green-300">RELAX</h2>
                        </div>
                        <p className="mt-2 text-[#FFFFFF] text-opacity-40 text-sm">Learing to code easier</p>
                    </div>

                    <div className="w-full mb-6 md:w-1/4">
                        <p className="mb-4 font-semibold text-[#FFFFFF]">Explore</p>
                        <ul className="space-y-2">
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">New Account</span></li>
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">Start Booking a Room</span></li>
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">Use Payments</span></li>
                        </ul>
                    </div>

                    <div className="w-full mb-6 md:w-1/4">
                        <p className="mb-4 font-semibold text-[#FFFFFF]">About Us</p>
                        <ul className="space-y-2">
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">Our Careers</span></li>
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">Privacy</span></li>
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">Terms & Conditions</span></li>
                        </ul>
                    </div>

                    <div className="w-full mb-6 md:w-1/4">
                        <p className="mb-4 font-semibold text-[#FFFFFF]">Support</p>
                        <ul className="space-y-2">
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">support@staycation.id</span></li>
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">021 - 2208 - 1996</span></li>
                            <li><span className="text-[#FFFFFF] text-opacity-40 text-sm">Staycation, Kemang, Jakarta</span></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-4 mt-8 text-center text-[#FFFFFF] text-opacity-40 text-sm">
                    Copyright 2024 • All rights reserved • CodeRelax
                </div>
            </div>
        </footer>
    );
}

export default Footer;
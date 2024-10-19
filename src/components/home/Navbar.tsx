
const Navbar = () => {
    return (
        <nav className="flex justify-between items-center w-full mt-4 pb-2 h-[95px]  bg-transparent text-[#FFFFFF] px-16">
            <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold">
                    <p>CodeRelax</p>
                </div>
            </div>

            <div className="flex space-x-16 text-lg">
                <a href="#" className="hover:text-gray-200">Home</a>
                <a href="#" className="hover:text-gray-200">Problems</a>
                <a href="#" className="hover:text-gray-200">Explore</a>
                <a href="#" className="hover:text-gray-200">Community</a>
                <a href="#" className="hover:text-gray-200">Leaderboard</a>
            </div>

            <div className="space-x-6">
                <button className="px-4 py-2 rounded-lg text-green-300 font-medium">Log In</button>
                <button className="px-4 py-2 rounded-3xl bg-trasnparent bg-[#FFFFFF]/30 text-[#FFFFFF] font-medium">Sign Up</button>
            </div>
        </nav>
    );
}

export default Navbar;

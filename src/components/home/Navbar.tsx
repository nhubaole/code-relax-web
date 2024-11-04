import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center w-full mt-4 pb-2 h-[95px]  bg-transparent text-[#FFFFFF] px-16">
            <div className="flex items-center space-x-4">
                {/* <div className="text-2xl font-bold">
                    <p>CodeRelax</p>
                </div> */}
                <div className="flex">
                    <h2 className="text-2xl font-bold text-[#FFFFFF]">CODE</h2>
                    <h2 className="text-2xl font-bold text-green-300">RELAX</h2>
                </div>
            </div>

            <div className="flex space-x-16 text-lg">
                <Link to="/" className="hover:text-gray-200">Home</Link>
                {/* <a href="#" className="hover:text-gray-200">Problems</a> */}
                <Link to="/problems" className="hover:text-gray-200">Problems</Link>
                {/* <a href="#" className="hover:text-gray-200">Explore</a> */}
                <Link to="/explore" className="hover:text-gray-200">Explore</Link>
                <a href="#" className="hover:text-gray-200">Community</a>
                {/* <Link to="/community" className="hover:text-gray-200">Community</Link> */}
                <a href="#" className="hover:text-gray-200">Leaderboard</a>
                {/* <Link to="/leaderboard" className="hover:text-gray-200">Leaderboard</Link> */}
            </div>

            <div className="space-x-6">
                <Link to="/login">
                    <button className="px-4 py-2 font-medium text-green-300 rounded-lg">Log In</button>
                </Link>
                
                <Link to="/signup">
                    <button className="px-4 py-2 rounded-3xl bg-transparent bg-[#FFFFFF]/30 text-[#FFFFFF] font-medium">Sign Up</button>
                </Link>

                {/* <button className="px-4 py-2 font-medium text-green-300 rounded-lg">Log In</button>
                <button className="px-4 py-2 rounded-3xl bg-trasnparent bg-[#FFFFFF]/30 text-[#FFFFFF] font-medium">Sign Up</button> */}
            </div>
        </nav>
    );
}

export default Navbar;

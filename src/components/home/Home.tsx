import Navbar from "./Navbar";
import home from "../../assets/home.png";

const Home = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-[800px] object-cover"
        src={home}
        alt="Background"
      />

      <div className="absolute inset-0 flex flex-col -top-1/3 justify-center space-y-8">
        <h1 className="font-extrabold text-7xl text-center text-[#FFFFFF]">
            <span className="text-green-300">Learning</span> to <span className="text-green-300">code</span> <br />
          doesn’t have to be painful.
        </h1>
        <p className="text-center text-[#FFFFFF]">CodeRelax is a powerful platform that allows you to learn and practice coding directly <br />
         in the browser with multi-language support and intelligent features.</p>
      </div>

      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;

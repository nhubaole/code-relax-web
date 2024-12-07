import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import img1 from "../../assets/imghome_1.svg";
import img2 from "../../assets/imghome_2.svg";

const Home = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-[800px] object-cover"
        src={home}
        alt="Background"
      />

      <div className="absolute inset-0 flex flex-col justify-center space-y-8 -top-1/3">
        <h1 className="font-extrabold text-7xl text-center text-[#FFFFFF]">
            <span className="text-green-300">Learning</span> to <span className="text-green-300">code</span> <br />
          doesn’t have to be painful.
        </h1>
        <p className="text-center text-[#FFFFFF]">CodeRelax is a powerful platform that allows you to learn and practice coding directly <br />
         in the browser with multi-language support and intelligent features.</p>
      </div>

      <div className="absolute inset-0 flex-col py-16 top-1/2 ">
        <div className="flex justify-center gap-16">
          <div className="w-[400px] h-[550px] bg-[#FFFFFF] rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden">
            <img
              className="object-cover w-full h-[290px]"
              src={img1}
              alt="Background"
            />
            <h1 className="text-3xl text-center mt-14 text-textcolorlight"><strong>Live Compiler</strong></h1>
            <p className="px-10 mt-4 text-center text-textcolor">
              Our Live Compiler allows you to compile and run code quickly.
            </p>
            <button 
              className="bg-black rounded-3xl text-[#FFFFFF] py-2.5 px-5 mt-8">
                Start practicing now            
            </button>
          </div>
          
          <div className="w-[400px] h-[550px] bg-[#FFFFFF] rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden">
            <img
              className="object-cover w-full h-[290px]"
              src={img2}
              alt="Background"
            />
            <h1 className="text-3xl text-center mt-14 text-textcolorlight"><strong>Grow Together</strong></h1>
            <p className="px-10 mt-4 text-center text-textcolor">
            You can exchange ideas, share code, or ask questions with the community.
            </p>
            <button 
              className="bg-yellow-300 rounded-3xl text-black py-2.5 px-5 mt-8">
                Start practicing now            
            </button>
          </div>
        </div>        
      </div>

      <div className="absolute inset-0 flex flex-col justify-center space-y-6 top-[1300px]">
        <strong className="text-6xl text-center text-textcolor">The hardest things of learning to code</strong>
        <strong className="text-6xl text-center text-purple-500 ">are easy with CodeRelax</strong>
        <p className="text-xl text-center text-textcolor w-[600px] mr-auto ml-auto">Our website provides all the essential tools to make learning to code easier and more effective.</p>
      </div>

      <div className="absolute inset-0 flex-col py-16 top-[1500px] ">
        <div className="flex justify-center gap-32">
          <div className="w-[400px] h-[300px] bg-[#FFFFFF] flex flex-col justify-center overflow-hidden space-y-5">
            <strong className="text-4xl text-left text-purple-500 ">Track your progress</strong>
            <p className="text-left text-textcolor w-[300px]">  Find out where you stand on the leaderboard and set your goals to conquer the challenges!</p>
          </div>
          
          <div className="w-[400px] h-[300px] bg-[#FFFFFF] rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={img1}
              alt="Background"
            />
          </div>
        </div>        
      </div>

      <div className="absolute inset-0 flex-col py-16 top-[1900px] ">
        <div className="flex justify-center gap-32">
          <div className="w-[400px] h-[300px] bg-[#FFFFFF] rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={img1}
              alt="Background"
            />
          </div>

          <div className="w-[400px] h-[300px] bg-[#FFFFFF] flex flex-col justify-center overflow-hidden space-y-5">
            <strong className="text-4xl text-left text-purple-500 ">Learning resources</strong>
            <p className="text-left text-textcolor w-[300px]">Explore a comprehensive and up-to-date library of academic resources, including in-depth articles on programming and the latest technologies.</p>
          </div>
        </div>        
      </div>

      <div className="absolute inset-0 flex-col py-16 top-[2300px] ">
        <div className="flex justify-center gap-32">
          <div className="w-[400px] h-[300px] bg-[#FFFFFF] flex flex-col justify-center overflow-hidden space-y-5">
            <strong className="text-4xl text-left text-purple-500 w-300">Test your knowledge with quizzes</strong>
            <p className="text-left text-textcolor w-[300px]">  You can challenge yourself with quiz exercises to check your knowledge.</p>
          </div>
          
          <div className="w-[400px] h-[300px] bg-[#FFFFFF] rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={img1}
              alt="Background"
            />
          </div>
        </div>        
      </div>

      <div className="absolute inset-0 flex-col px-28 py-16 top-[2800px] h-72 bg-gradient-to-l from-green-500 to-textcolorlight">
        <div className="flex justify-center gap-32">
          <div className="flex-col justify-center flex-1 space-y-5 overflow-hidden ">
            <strong className="text-left text-[#ffffff] text-6xl w-300">Ready to join?</strong>
            <p className="text-left text-xl text-[#ffffff] w-[630px]">  Sign up now to begin your coding journey with CodeRelax and conquer coding challenges from easy to advanced.</p>
          </div>
          
          <div className="w-[400px] h-[300px] flex-2 flex-col items-center overflow-hidden">
          <Link to="/signup">
            <button 
              className="px-24 py-5 mt-8 text-2xl text-black bg-yellow-300 rounded-3xl">
                Sign up now            
            </button>
          </Link>
          </div>
        </div>        
      </div>

      <div className="absolute inset-0 p-16 top-[3000px] h-auto">
        <footer className="py-10 text-gray-200 bg-gray-800 mt-36">
          <div className="container px-4 mx-auto border-t border-textcolor border-opacity-40 ">
              <div className="flex flex-wrap justify-between mt-16">
                  
                  <div className="w-full mb-6 md:w-1/4">
                      <div className="flex">
                          <h2 className="text-xl font-semibold text-textcolor]">CODE</h2>
                          <h2 className="text-xl font-semibold text-green-300">RELAX</h2>
                      </div>
                      <p className="mt-2 text-sm text-textcolorgray text-opacity-40">Learing to code easier</p>
                  </div>

                  <div className="w-full mb-6 md:w-1/4">
                      <p className="mb-4 font-semibold text-textcolor">Explore</p>
                      <ul className="space-y-2">
                          <li><span className="text-sm text-textcolorgray text-opacity-40">New Account</span></li>
                          <li><span className="text-sm text-textcolorgray text-opacity-40">Start Booking a Room</span></li>
                          <li><span className="text-sm text-textcolorgray text-opacity-40">Use Payments</span></li>
                      </ul>
                  </div>

                  <div className="w-full mb-6 md:w-1/4">
                      <p className="mb-4 font-semibold text-textcolor">About Us</p>
                      <ul className="space-y-2">
                          <li><span className="text-sm text-textcolorgray text-opacity-40">Our Careers</span></li>
                          <li><span className="text-sm text-textcolorgray text-opacity-40">Privacy</span></li>
                          <li><span className="text-sm text-textcolorgray text-opacity-40">Terms & Conditions</span></li>
                      </ul>
                  </div>

                  <div className="w-full mb-6 md:w-1/4">
                      <p className="mb-4 font-semibold text-textcolor">Support</p>
                      <ul className="space-y-2">
                          <li><span className="text-sm text-textcolorgray text-opacity-40">support@staycation.id</span></li>
                          <li><span className="text-sm text-textcolorgray text-opacity-40">021 - 2208 - 1996</span></li>
                          <li><span className="text-sm text-textcolorgray text-opacity-40">Staycation, Kemang, Jakarta</span></li>
                      </ul>
                  </div>
              </div>

              <div className="pt-4 mt-8 text-sm text-center text-textcolorgray text-opacity-40">
                  Copyright 2024 • All rights reserved • CodeRelax
              </div>
          </div>
        </footer>
      </div>
    </div>   
  );
};

export default Home;

import React, { useState } from "react";
import AllProblemPage from "./AllProblemPage";

const Sidebar = () => {
  const menuItems = [
    { name: "New problem", icon: "🏠" },
    { name: "Problem", icon: "👥" },
    { name: "Article", icon: "🏢" },
  ];

  const [activeMenu, setActiveMenu] = useState("New problem");

  return (
    <div className="flex">
      <aside className="w-72 text-gray-300 h-screen p-5">
        <div className="text-[white] text-2xl font-bold mb-8">
          CODE<span className="text-[#7152F3]">RELAX</span>
        </div>
        <ul className="bg-[#A2A1A80D] p-4 rounded-[20px] space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActiveMenu(item.name)} // Update active menu
              className={`flex items-center text-[white] gap-4 p-3 rounded-tr-lg rounded-br-lg cursor-pointer ${
                activeMenu === item.name
                  ? "border-l-2 border-[#7152F3] bg-[#7152F30D] text-[#7152F3]"
                  : "hover:border-l-2 hover:border-[#7152F3] hover:bg-[#7152F30D] hover:text-[#7152F3]"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-semibold">{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 text-black p-5">
        {activeMenu === "New problem" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">New Problem</h1>
            <p>Create a new problem here!</p>
          </div>
        )}
        {activeMenu === "Problem" && (
          <div>
           <AllProblemPage/>
          </div>
        )}
        {activeMenu === "Article" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <p>Explore our latest articles here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import star from "../../assets/Star.svg"

const ItemPoint = ({ 
    points = "10", 
    problem = "Completed a daily check-in mission", 
    time = "Sunday, Oct 6, 2024, 04:58 PM"}) => {

    return (
        <div className="flex w-full">
            <img src={star} alt="Icon" className="w-4 h-4 mt-0.5 ml-1.5" />             
            <span className="flex-none w-1/6 ml-2 text-left text-yellow-300">{points}</span>   
            <span className="flex-1  text-left text-[#FFFFFF]">{problem}</span>   
            <span className="text-sm flex-none w-1/4 text-right text-[#FFFFFF]">{time}</span>  
        </div>   
    );
};

const DivPoints = () => {
    const listPoint = [
        { points: "10", problem: "Completed a daily check-in mission", time: "Sunday, Oct 6, 2024, 04:58 PM" },
        { points: "20", problem: "Solved a math challenge", time: "Monday, Oct 7, 2024, 09:30 AM" },
        { points: "18", problem: "Participated in a quiz", time: "Tuesday, Oct 8, 2024, 01:45 PM" },
        { points: "15", problem: "Completed a daily check-in mission", time: "Sunday, Oct 6, 2024, 04:58 PM" },
        { points: "20", problem: "Solved a math challenge", time: "Monday, Oct 7, 2024, 09:30 AM" },
        { points: "10", problem: "Participated in a quiz", time: "Tuesday, Oct 8, 2024, 01:45 PM" },
        { points: "10", problem: "Completed a daily check-in mission", time: "Sunday, Oct 6, 2024, 04:58 PM" },
        { points: "20", problem: "Solved a math challenge", time: "Monday, Oct 7, 2024, 09:30 AM" },
        { points: "18", problem: "Participated in a quiz", time: "Tuesday, Oct 8, 2024, 01:45 PM" },
        { points: "15", problem: "Completed a daily check-in mission", time: "Sunday, Oct 6, 2024, 04:58 PM" },
        { points: "20", problem: "Solved a math challenge", time: "Monday, Oct 7, 2024, 09:30 AM" },
        { points: "10", problem: "Participated in a quiz", time: "Tuesday, Oct 8, 2024, 01:45 PM" },
        { points: "10", problem: "Completed a daily check-in mission", time: "Sunday, Oct 6, 2024, 04:58 PM" },
        // Add more items as needed
    ];

    return (
        <div className="px-10 text-white">
            <div className="flex mb-4">
                <h1 className="text-left text-[#FFFFFF] flex-initial">My Point:</h1> 
                <h1 className="flex-initial ml-4 text-left text-yellow-500">1010</h1>
                <img src={star} alt="Icon" className="w-4 h-4 mt-0.5 ml-1.5" /> 
            </div>              

            <div className="bg-[#ffffff] bg-opacity-10 px-6 py-4 rounded-xl shadow-2xl flex-col space-y-3 h-[535px] overflow-y-scroll scrollbar-thin hover:scrollbar-hide">
                {listPoint.map((item, index) => (
                    <React.Fragment key={index}>
                        <ItemPoint points={item.points} problem={item.problem} time={item.time} />
                        <hr className="border-t border-green-700 border-opacity-50 my-7" />
                    </React.Fragment>
                ))}
            </div>    
        </div>
    );
};

export default DivPoints;
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
        { points: "24", problem: "Solved Dijkstra's algorithm problem", time: "Friday, Jan 2, 2025, 08:15 PM" },
        { points: "19", problem: "Solved Merge Sort problem", time: "Tuesday, Dec 31, 2024, 06:45 PM" },
        { points: "21", problem: "Solved N-Queens problem", time: "Saturday, Dec 28, 2024, 10:20 AM" },
        { points: "15", problem: "Solved Knapsack problem", time: "Wednesday, Dec 25, 2024, 04:00 PM" },
        { points: "18", problem: "Solved Longest common subsequence problem", time: "Sunday, Dec 22, 2024, 11:50 AM" },
        { points: "20", problem: "Solved Two Sum problem", time: "Thursday, Dec 19, 2024, 02:30 PM" },
        { points: "13", problem: "Solved Graph traversal problem", time: "Monday, Dec 16, 2024, 09:15 AM" },
        { points: "17", problem: "Solved Fibonacci series problem", time: "Friday, Dec 13, 2024, 03:45 PM" },
        { points: "14", problem: "Solved Binary search problem", time: "Tuesday, Dec 10, 2024, 07:00 PM" },
        { points: "22", problem: "Solved Subset sum problem", time: "Saturday, Dec 7, 2024, 01:10 PM" },
        { points: "16", problem: "Solved Palindrome check problem", time: "Wednesday, Dec 4, 2024, 08:55 AM" },
        { points: "12", problem: "Solved Merge two sorted arrays problem", time: "Monday, Dec 2, 2024, 10:40 PM" },
        { points: "19", problem: "Solved Matrix multiplication problem", time: "Friday, Nov 29, 2024, 04:25 PM" },
        { points: "20", problem: "Solved Binary tree traversal problem", time: "Tuesday, Nov 26, 2024, 12:00 PM" },
        { points: "15", problem: "Solved Find missing number problem", time: "Saturday, Nov 23, 2024, 03:00 AM" }
    ];
    

    return (
        <div className="px-10 text-white">
            <div className="flex mb-4">
                <h1 className="text-left text-[#FFFFFF] flex-initial">My Point:</h1> 
                <h1 className="flex-initial ml-4 text-left text-yellow-500">265</h1>
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
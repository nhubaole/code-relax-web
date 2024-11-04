import Footer from "../profile/Footer";
import send from "../../assets/send.svg";
import React, { useState } from 'react';
import school from "../../assets/school_white.svg";
import package1 from "../../assets/data_structure.svg";
import package2 from "../../assets/algorithms.svg";
import package3 from "../../assets/problem_solving.svg";
import package4 from "../../assets/top_interview.svg";
import arrange from "../../assets/arrange.svg"
import icstatus from "../../assets/status.svg"
import star from "../../assets/Star.svg"
import search from "../../assets/search.svg"

const PackageTag = ({ content }: { content: string }) => {
    return (
        <div className="h-6 p-1 w-auto flex items-center bg-[#ffffff] rounded-xl">
            <img
                className="object-cover w-4 h-4 mr-1"
                src={school}
                alt="icon"
            />
            <span className="flex-grow mr-1 text-xs text-left text-green-700">{content}</span>
        </div>
    );
};

const Package: React.FC <{
    name: string; 
    last_update: Date; 
    participants: number; 
    tags: string[]; 
    icon: string;
    color: string; }> = ({ name, last_update, participants, tags, icon, color }) => {
    const timeDifference = new Date().getTime() - last_update.getTime(); 
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24)); 
    const displayText = daysAgo > 30 ? 
        `Updated ${Math.floor(daysAgo / 30)} month${Math.floor(daysAgo / 30) > 1 ? 's' : ''} ago` :
        `Updated ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;

    return (
        <div className={`bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl shadow-2xl flex flex-col w-96 mt-6 border-l-[6px]`} style={{ borderColor: color }}> {/* Thay đổi màu border */}
            <div className="flex items-center flex-none w-full">
                <img
                    className="flex-none object-cover w-10 h-10"
                    src={icon}
                    alt="icon"
                />
                <div className="flex flex-col ml-2">
                    <span className="font-bold text-left text-[#FFFFFF]">{name}</span>
                    <span className="text-xs text-left text-[#FFFFFF]">{displayText}</span>
                </div>
                <button
                    type="button"
                    className="w-11 h-10 bg-[#ffffff] bg-opacity-10 p-2 rounded-full ml-auto mr-1">
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <img src={send} alt="Icon" className="w-6 h-6"/>
                    </label>
                </button>      
            </div>

            <div className="flex py-5 overflow-x-auto hide-scrollbar">
                {tags.map((tag, index) => (
                    <div className="mr-2" key={index}>
                        <PackageTag content={tag} />
                    </div>
                ))}
            </div>

            <div className="flex flex-none">
                <span className="text-3xl mt-auto text-left text-[#FFFFFF]">{participants}</span>
                <span className="mt-auto mb-1 px-1 text-xs text-left text-[#FFFFFF]">participants</span>
            </div>
        </div>
    );
};

const Problem: React.FC <{
    status: boolean; 
    title: string; 
    rating: number; 
    difficulty: string; 
    acceptance: number;  }> = ({ status, title, rating, difficulty, acceptance }) => {
    
    return (
        <div className="flex w-full px-4 py-4 border-b border-blacklight">
            <div className="flex flex-1">
                {status && (
                    <img
                        className="flex-none object-cover w-5 h-5 mt-auto mb-auto ml-1"
                        src={icstatus}
                        alt="icon"
                    />
                )}
            </div>
            <div className="flex-none w-1/3">
                <span className="text-left text-[#FFFFFF]">{title}</span>
            </div>
            <div className="flex flex-1">
                <img
                    className="flex-none object-cover w-3 h-3 mt-1"
                    src={star}
                    alt="icon"
                />
                <span className="text-left mt-auto mb-auto ml-1 text-[#FFFFFF]">{rating.toFixed(1)} </span>   
            </div>
            <div className="flex-1">
                <span 
                    className={`text-left ${
                        difficulty === 'Hard' ? 'text-red' : 
                        difficulty === 'Medium' ? 'text-yellow-300' : 
                        'text-green-300'
                    }`}
                >
                    {difficulty}
                </span>
            </div>

            <div className="flex flex-1">
                <span className="text-left mt-auto mb-auto text-[#FFFFFF]">
                    {acceptance.toFixed(1)} %
                </span>   
            </div>
        </div>
    );
};

const SearchTag = ({ content, onSelect, isSelected }: { 
    content: string; 
    onSelect: (content: string) => void; 
    isSelected: boolean; 
}) => {
    return (
        <button 
            className={`p-4 w-auto h-8 flex items-center rounded-2xl ${isSelected ? 'bg-opacity-100 text-black' : 'bg-opacity-10 text-[#ffffff]'} bg-[#ffffff] hover:bg-opacity-40 hover:text-black`} 
            onClick={() => onSelect(content)}
        >{content}
        </button>
    );
};


const Problems = () => {
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const handleTagSelect = (content: string) => {
        setSelectedTag(content);
        const inputElement = document.getElementById('_search') as HTMLInputElement; // tìm input
        if (inputElement) {
            inputElement.value = content; 
        }
    };    

    const handleCheckboxChange = (value: string) => {
        setSelectedStatus(value);
    };

    const handleDifficultyChange = (value: string) => {
        setSelectedDifficulty(value);
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-l from-green-500 to-textcolorlight">            
            <div className="flex-col flex-grow px-16 py-2 mt-28">
                <div className="flex-grow ">
                    <h1 className="text-xl font-bold text-left text-[#FFFFFF]">Package</h1> 
                    <div className="flex space-x-7">
                        <Package
                            name="Data Structures"
                            last_update={new Date('2024-10-20')}
                            participants={45}
                            tags={["Beginner"]} 
                            icon={package1}
                            color="#8B79F1"
                        />
                        <Package
                            name="Algorithms"
                            last_update={new Date('2024-11-01')}
                            participants={38}
                            tags={["Beginner"]} 
                            icon={package2}
                            color="#DF4A52"
                        />
                        <Package
                            name="Problems Solving"
                            last_update={new Date('2024-9-3')}
                            participants={25}
                            tags={["Beginner", "Intermediate"]} 
                            icon={package3}
                            color="#F4AB04"
                        />
                        <Package
                            name="Top Interview"
                            last_update={new Date('2024-10-12')}
                            participants={105}
                            tags={["Intermediate", "Advanced"]} 
                            icon={package4}
                            color="#1CE496"
                        />
                    </div>
                </div>

                <div className="flex-grow mt-10 mr-7">
                    <h1 className="text-left text-xl font-bold text-[#FFFFFF] mb-4 ">All Problems</h1>   
                    <div className="flex min-w-screen space-x-7">
                        <div className="bg-[#ffffff] flex-none w-3/5 bg-opacity-10 px-4 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                            <div className="bg-[#ffffff] flex bg-opacity-10 px-4 py-1 rounded shadow-2xl">
                                <div className="flex flex-1">
                                    <span className="text-xs text-left text-[#FFFFFF] mt-auto mb-auto">STATUS</span>   
                                    <img
                                        className="flex-none object-cover w-2 h-2 mt-auto mb-auto ml-1"
                                        src={arrange}
                                        alt="icon"
                                    />
                                </div>
                                <div className="flex-none w-1/3 "><span className="text-xs text-left text-[#FFFFFF]">TITLE</span></div>
                                <div className="flex flex-1">
                                    <span className="text-xs text-left mt-auto mb-auto text-[#FFFFFF]">RATING</span>   
                                    <img
                                        className="flex-none object-cover w-2 h-2 mt-auto mb-auto ml-1"
                                        src={arrange}
                                        alt="icon"
                                    />
                                </div>
                                <div className="flex-1 "><span className="text-xs text-left text-[#FFFFFF]">DIFFICULTY</span></div>
                                <div className="flex flex-1">
                                    <span className="text-xs text-left mt-auto mb-auto text-[#FFFFFF]">ACCEPTANCE</span>   
                                    <img
                                        className="flex-none object-cover w-2 h-2 mt-auto mb-auto ml-1"
                                        src={arrange}
                                        alt="icon"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col overflow-y-auto max-h-[680px]">
                                {problems.map((problem, index) => (
                                    <Problem 
                                        key={index} 
                                        status={problem.status}  
                                        title={problem.title} 
                                        rating={problem.rating}  
                                        difficulty={problem.difficulty} 
                                        acceptance={problem.acceptance} 
                                    />
                                ))}
                            </div>
                        </div>  
                        
                        <div className="flex-none w-2/5">
                            <div className="bg-[#ffffff] bg-opacity-10 px-4 py-2 rounded-xl shadow-2xl flex">                               
                                <img
                                    className="flex-none object-cover w-6 h-6 ml-1"
                                    src={search}
                                    alt="icon"
                                />  
                                <input
                                    id='_search'
                                    type="text"
                                    className="w-full text-[#FFFFFF] bg-[#FFFFFF] px-3 text-sm bg-opacity-0 border-none focus:outline-none placeholder-[#FFFFFF]"                          
                                    placeholder="Search problems"
                                />                             
                            </div>

                            <div className="flex-col px-4 py-2 rounded mt-7">                               
                                <strong className="text-[#FFFFFF] ">TAGS</strong>  
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {tags.map((tag, index) => (
                                        <div className="mb-2" key={index}>
                                            <SearchTag 
                                                content={tag} 
                                                onSelect={handleTagSelect} 
                                                isSelected={selectedTag === tag} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex-col px-4 py-2 mt-5 rounded">                               
                                <strong className="text-[rgb(255,255,255)] ">STATUS</strong>                                  
                                <div className="flex flex-col text-[#FFFFFF] mt-3">
                                    <label className="flex items-center mb-2">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedStatus === 'solved'} 
                                            onChange={() => handleCheckboxChange('solved')} 
                                            className="mr-2 custom-checkbox" 
                                        />Solved
                                    </label>
                                    <label className="flex items-center text-[#FFFFFF]">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedStatus === 'unsolved'} 
                                            onChange={() => handleCheckboxChange('unsolved')} 
                                            className="mr-2 custom-checkbox"  
                                        />Unsolved
                                    </label>
                                </div>
                            </div>

                            <div className="flex-col px-4 py-2 mt-5 rounded">                               
                                <strong className="text-[rgb(255,255,255)] ">DIFFICULTY</strong>                                  
                                <div className="flex flex-col text-[#FFFFFF] mt-3">
                                    <label className="flex items-center mb-2">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedDifficulty === 'easy'} 
                                            onChange={() => handleDifficultyChange('easy')} 
                                            className="mr-2 custom-checkbox" 
                                        />Easy
                                    </label>
                                    <label className="flex items-center mb-2 text-[#FFFFFF]">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedDifficulty === 'medium'} 
                                            onChange={() => handleDifficultyChange('medium')} 
                                            className="mr-2 custom-checkbox"  
                                        />Medium
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedDifficulty === 'hard'} 
                                            onChange={() => handleDifficultyChange('hard')} 
                                            className="mr-2 custom-checkbox" 
                                        />Hard
                                    </label>
                                </div>
                            </div>
                        </div>    

                         
                    </div>
                </div>
            </div>            
            <Footer />
        </div>   
    );
};

const problems = [
    { status: true, title: "Solve Me First", rating: 4.0, difficulty: "Easy", acceptance: 53.8 },
    { status: false, title: "Simple Array Sum", rating: 3.5, difficulty: "Medium", acceptance: 41.1 },
    { status: true, title: "A Very Big Sum", rating: 2.8, difficulty: "Medium", acceptance: 34.5 },
    { status: false, title: "Reverse Integer", rating: 4.5, difficulty: "Hard", acceptance: 29.2 },
    { status: false, title: "Integer to Roman", rating: 5.0, difficulty: "Easy", acceptance: 56.2 },
    { status: true, title: "Add Two Numbers", rating: 2.0, difficulty: "Easy", acceptance: 66.3 },
    { status: true, title: "Solve Me First", rating: 4.0, difficulty: "Easy", acceptance: 53.8 },
    { status: false, title: "Simple Array Sum", rating: 3.5, difficulty: "Medium", acceptance: 41.1 },
    { status: true, title: "A Very Big Sum", rating: 2.8, difficulty: "Medium", acceptance: 34.5 },
    { status: false, title: "Reverse Integer", rating: 4.5, difficulty: "Hard", acceptance: 29.2 },
    { status: false, title: "Integer to Roman", rating: 5.0, difficulty: "Easy", acceptance: 56.2 },
    { status: true, title: "Add Two Numbers", rating: 2.0, difficulty: "Easy", acceptance: 66.3 },
];

const tags = ["Array", "String", "Sorting", "Math", "Dynamic Programming", "Hash Table", "Array", "String", "Sorting", "Math", "Dynamic Programming", "Hash Table"];

export default Problems;
import Footer from "../profile/Footer";
import React from 'react';
import arrange from "../../assets/arrange.svg"
import avatar from "../../assets/avatar.jpg"

const Top: React.FC <{
    name: string; 
    submissions: number; 
    percent: number; 
    solved: number }> = ({ name, submissions, percent, solved}) => {
    return (
        <div className="bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl shadow-2xl flex flex-col h-[280px] w-[450px] mt-6 border-l-[6px] border-[#F4AB04]">
            <div className="flex items-center flex-none w-full ">
                <img
                    className="flex-none object-cover w-[140px] rounded-full h-[140px]"
                    src={avatar}
                    alt="icon"
                />
                <div className="flex flex-col ml-2">
                    <h1 className="font-medium text-4xl text-left text-[#FFFFFF]">{name}</h1>
                    <span className="text-xs text-left mt-2 text-[#FFFFFF]">{submissions} submissions</span>
                </div>
                <div className="w-11 h-11 bg-[#ffffff] bg-opacity-10 rounded-full ml-auto mb-auto flex items-center justify-center text-[#ffffff]">1</div>      
            </div>

            <div className="flex px-3 py-5 mt-3">
                <div className="h-5 px-2 w-auto flex items-center bg-[#ffffff] rounded-xl">            
                    <span className="flex-grow mr-1 text-xs text-left text-green-700">{solved} Solved</span>
                </div>
            </div>

            <div className="flex flex-none px-3">
                <span className="text-3xl mt-auto font-bold text-left text-[#FFFFFF]">{percent}% </span>
                <span className="mt-auto mb-1 px-1 text-xs text-left text-[#FFFFFF]">acceptance</span>
            </div>
        </div>
    );
};

const TopRank: React.FC <{
    name: string; 
    submissions: number; 
    percent: number; 
    solved: number 
    color: string }> = ({ name, submissions, percent, solved, color}) => {
    return (
        <div className={`bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl shadow-2xl flex flex-col h-[180px] w-[308px] mt-6 border-l-[6px]`} style={{ borderColor: color }}> 
            <div className="flex items-center flex-none w-full ">
                <img
                    className="flex-none object-cover w-[50px] rounded-full h-[50px]"
                    src={avatar}
                    alt="icon"
                />
                <div className="flex flex-col ml-2">
                    <h1 className="font-medium text-xl text-left text-[#FFFFFF]">{name}</h1>
                    <span className="text-xs text-left text-[#FFFFFF]">{submissions} submissions</span>
                </div>
                <div className={`w-8 h-8 bg-[#ffffff] bg-opacity-10 rounded-full ml-auto mb-auto flex items-center justify-center text-[#ffffff]`}>{color === "#FFFFFF" ? 2 : 3}</div>      
            </div>

            <div className="flex px-1 py-3 mt-3">
                <div className="h-5 px-2 w-auto flex items-center bg-[#ffffff] rounded-xl">            
                    <span className="flex-grow mr-1 text-xs text-left text-green-700">{solved} Solved</span>
                </div>
            </div>

            <div className="flex flex-none px-1">
                <span className="text-3xl mt-auto font-bold text-left text-[#FFFFFF]">{percent}% </span>
                <span className="mt-auto mb-1 px-1 text-xs text-left text-[#FFFFFF]">acceptance</span>
            </div>
        </div>
    );
};

const Leaderboard: React.FC <{
    rank: number; 
    name: string; 
    submission: number; 
    solved: number;
    acceptance: number;  }> = ({ rank, name, submission, solved, acceptance }) => {
    
    return (
        <div className="flex w-full px-2 py-2 border-b border-blacklight">
            <div className="flex flex-1">
                <span className="text-left mt-auto mb-auto text-[#FFFFFF]">
                    {rank} 
                </span>   
            </div>
            <div className="flex w-2/5">
                <img
                    className="flex-none object-cover w-[40px] h-[40px] mt-1 rounded-full"
                    src={avatar}
                    alt="icon"
                />
                <span className="text-left mt-auto mb-auto ml-3 text-[#FFFFFF]">{name}  </span>   
            </div>
            <div className="flex flex-1">
                <span className="text-left mt-auto mb-auto ml-1 text-[#FFFFFF]">{submission}</span>   
            </div>
            <div className="flex flex-1">
                <span className="mt-auto mb-auto text-green-300">{solved}</span>
            </div>

            <div className="flex flex-1">
                <span className="text-left mt-auto mb-auto text-[#FFFFFF]">
                    {acceptance.toFixed(1)} %
                </span>   
            </div>
        </div>
    );
};
interface LeaderboardProps {
    isLoggedIn: boolean;
  }
  
const LeaderBoard: React.FC<LeaderboardProps> = (props) => {
    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-l from-green-500 to-textcolorlight">            
            <div className="flex-col flex-grow px-16 py-2 mt-28">
                {props.isLoggedIn && ( 
                    <div className="flex items-center flex-none w-full h-[200px] pb-20 border-b border-[#FFFFFF] border-opacity-40 p-8">
                        <img
                            className="rounded-full w-[190px] h-[190px]"
                            src={avatar}
                            alt="icon"
                        />
                        <div className="flex flex-col ml-10">
                            <span className="font-bold text-left text-5xl text-[#FFFFFF]">HaAnh</span>
                            <span className="text-xl mt-6 text-left text-[#FFFFFF]">
                                <span className="text-yellow-500">RANK: </span>147
                            </span>
                        </div>   
                    </div>
                )}
                
                <div className="flex-grow ">
                    <div className="flex items-center space-x-28">
                        <Top
                            name="John Doe"
                            submissions={100}
                            solved={49}
                            percent={99}                            
                        />
                        <TopRank
                            name="John Doe"
                            submissions={100}
                            solved={49}
                            percent={99}
                            color="#FFFFFF"   
                        />
                        <TopRank
                            name="John Doe"
                            submissions={100}
                            solved={49}
                            percent={99}  
                            color="#F4AB04"   
                        />
                    </div>
                </div>

                <div className="flex-grow mt-10 mr-7"> 
                    <div className="flex min-w-screen space-x-7">
                        <div className="bg-[#ffffff] flex-none w-full bg-opacity-10 px-4 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                            <div className="bg-[#ffffff] flex bg-opacity-10 px-4 py-1 rounded shadow-2xl">
                                <div className="flex flex-1">
                                    <span className="text-xs text-left text-[#FFFFFF] mt-auto mb-auto">RANK</span>  
                                </div>
                                <div className="flex-none w-2/5 "><span className="text-xs text-left text-[#FFFFFF]">NAME</span></div>
                                <div className="flex flex-1">
                                    <span className="text-xs text-left mt-auto mb-auto text-[#FFFFFF]">SUBMISSION</span> 
                                </div>
                                <div className="flex-1 "><span className="text-xs text-left text-[#FFFFFF]">SOLVED</span></div>
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
                                {leaderboard.map((lb) => (
                                    <Leaderboard 
                                        rank={lb.rank} 
                                        name={lb.name}  
                                        submission={lb.submission} 
                                        solved={lb.solved}  
                                        acceptance={lb.acceptance} 
                                    />
                                ))}
                            </div>
                        </div>                         
                        
                    </div>
                </div>
            </div>            
            <Footer />
        </div>   
    );
};

const leaderboard = [
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
    { rank: 1, name: "Solve Me First", submission: 100, solved: 49, acceptance: 53.8 },
];

export default LeaderBoard;
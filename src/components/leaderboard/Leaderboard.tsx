import Footer from "../profile/Footer";
import React, { useEffect, useState } from 'react';
import arrange from "../../assets/arrange.svg"
import { LeaderBoardReq } from '../../models/user';
import UserService from "../../services/UserService";
import { useUser } from "../../context/UserContext";
import { useCookies } from "react-cookie";

const Top: React.FC <{
    name: string; 
    userAvatar:string;
    submissions: number; 
    percent: number; 
    solved: number }> = ({ name, userAvatar, submissions, percent, solved}) => {
    return (
        <div className="bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl shadow-2xl flex flex-col h-[280px] w-[450px] mt-6 border-l-[6px] border-[#F4AB04]">
            <div className="flex items-center flex-none w-full ">
                <img
                    className="flex-none object-cover w-[140px] rounded-full h-[140px]"
                    src={userAvatar}
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
    userAvatar: string;
    submissions: number; 
    percent: number; 
    solved: number 
    color: string }> = ({ name, userAvatar, submissions, percent, solved, color}) => {
    return (
        <div className={`bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl shadow-2xl flex flex-col h-[180px] w-[308px] mt-6 border-l-[6px]`} style={{ borderColor: color }}> 
            <div className="flex items-center flex-none w-full ">
                <img
                    className="flex-none object-cover w-[50px] rounded-full h-[50px]"
                    src={userAvatar}
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
    userName: string; 
    userAvatar: string;
    submission: number; 
    solved: number;
    acceptance: number;  }> = ({ rank, userName, userAvatar, submission, solved, acceptance }) => {  
    
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
                    src={userAvatar}
                    alt="icon"
                />
                <span className="text-left mt-auto mb-auto ml-3 text-[#FFFFFF]">{userName}  </span>   
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
    const [leaderBoard, setLeaderBoard] = useState<LeaderBoardReq | null>(null);
    const [cookie, , removeCookie] = useCookies(["token"]);
    const token = cookie.token  
    
    const getLeaderBoard = async () => {
    const userService = new UserService();
      try {
      const lb = await userService.getLeaderBoard(token);
      setLeaderBoard(lb); 
      } catch (error) {
      console.error("Failed to fetch current user:", error);
      }
    };
    
    useEffect(() => {    
        getLeaderBoard();
    }, []); 
    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-l from-green-500 to-textcolorlight">            
            <div className="flex-col flex-grow px-16 py-2 mt-28">
                {props.isLoggedIn && ( 
                    <div className="flex items-center flex-none w-full h-[200px] pb-20 border-b border-[#FFFFFF] border-opacity-40 p-8">
                        <img
                            className="rounded-full w-[190px] h-[190px]"
                            src={leaderBoard?.userAvatar}
                            alt="icon"
                        />
                        <div className="flex flex-col ml-10">
                            <span className="font-bold text-left text-5xl text-[#FFFFFF]">{leaderBoard?.userName}</span>
                            <span className="text-xl mt-6 text-left text-[#FFFFFF]">
                                <span className="text-yellow-500">RANK: </span>{leaderBoard?.rank}
                            </span>
                        </div>   
                    </div>
                )}
                
                <div className="flex-grow ">
                    <div className="flex items-center space-x-28">
                        {leaderBoard?.listUser && leaderBoard.listUser.length > 0 && (
                            <Top
                                name={leaderBoard.listUser[0].userName || ''}
                                userAvatar={leaderBoard.listUser[0].userAvatar || ''}
                                submissions={leaderBoard.listUser[0].totalSubmission || 0}
                                solved={leaderBoard.listUser[0].totalSolved || 0}
                                percent={leaderBoard.listUser[0].acceptance || 0}
                            />
                        )}
                        {leaderBoard?.listUser && leaderBoard.listUser.length > 1 && (
                            <TopRank
                                name={leaderBoard?.listUser[1].userName || ''}
                                userAvatar={leaderBoard.listUser[1].userAvatar || ''}
                                submissions={leaderBoard?.listUser[1].totalSubmission || 0}
                                solved={leaderBoard?.listUser[1].totalSolved || 0}
                                percent={leaderBoard?.listUser[1].acceptance || 0}  
                                color="#FFFFFF"   
                            />
                        )}
                        {leaderBoard?.listUser && leaderBoard.listUser.length > 2 && (
                            <TopRank
                                name={leaderBoard?.listUser[2].userName || ''}
                                userAvatar={leaderBoard.listUser[2].userAvatar || ''}
                                submissions={leaderBoard?.listUser[2].totalSubmission || 0}
                                solved={leaderBoard?.listUser[2].totalSolved || 0}
                                percent={leaderBoard?.listUser[2].acceptance || 0}    
                                color="#F4AB04"   
                            />
                        )}
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
                                {leaderBoard?.listUser.map((user) => (
                                    <Leaderboard 
                                        rank={user.rank} 
                                        userName={user.userName}  
                                        userAvatar={user.userAvatar}  
                                        submission={user.totalSubmission} 
                                        solved={user.totalSolved}  
                                        acceptance={user.acceptance} 
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

export default LeaderBoard;
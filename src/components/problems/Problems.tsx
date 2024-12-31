import Footer from "../profile/Footer";
import send from "../../assets/send.svg";
import React, { useEffect, useState } from 'react';
import school from "../../assets/school_white.svg";
import package1 from "../../assets/data_structure.svg";
import package2 from "../../assets/algorithms.svg";
import package3 from "../../assets/problem_solving.svg";
import package4 from "../../assets/top_interview.svg";
import arrange from "../../assets/arrange.svg"
import icstatus from "../../assets/status.svg"
import star from "../../assets/Star.svg"
import search from "../../assets/search.svg"
import PackageService from "../../services/PackageService";
import { Package, ProblemInfor } from "../../models/package";

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

const DivPackage: React.FC <{
    content: string; 
    update_At: Date; 
    numberParticipants: number; 
    levels: string[];
    icon: string;
    color: string; }> = ({ content, update_At, numberParticipants, levels, icon, color }) => {
    const timeDifference = new Date().getTime() - update_At.getTime(); 
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24)); 
    const displayText = daysAgo > 30 ? 
        `Updated ${Math.floor(daysAgo / 30)} month${Math.floor(daysAgo / 30) > 1 ? 's' : ''} ago` :
        `Updated ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
        

    return (
        <div className={`bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl flex-none flex flex-col w-[305px] mt-6 border-l-[6px]`} style={{borderColor: color }}>
            <div className="flex items-center flex-none w-full">
                <img
                    className="flex-none object-cover w-10 h-10"
                    src={icon}
                    alt="icon"
                />
                <div className="flex flex-col ml-2">
                    <span className="font-bold text-left text-[#FFFFFF]">{content}</span>
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
                {levels.map((tag, index) => (
                    <div className="mr-2" key={index}>
                        <PackageTag content={tag} />
                    </div>
                ))}
            </div>

            <div className="flex flex-none">
                <span className="text-3xl mt-auto text-left text-[#FFFFFF]">{numberParticipants}</span>
                <span className="mt-auto mb-1 px-1 text-xs text-left text-[#FFFFFF]">participants</span>
            </div>
        </div>
    );
};

const Problem: React.FC <{
    status: boolean; 
    title: string; 
    rating: number; 
    difficulty: number; 
    acceptance: number; }> = ({ status, title, rating, difficulty, acceptance }) => {
    
    return (
        <div className="flex w-full px-4 py-4 border-b border-blacklight">
            <div className="flex flex-1">
                {status ? (
                    <img
                        className="object-cover w-5 h-5 ml-1"
                        src={icstatus}
                        alt="icon"
                    />
                 ) : null}
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
                {/* <span className="text-left mt-auto mb-auto ml-1 text-[#FFFFFF]">{rating.toFixed(1)} </span>    */}
                <span className="text-left mt-auto mb-auto ml-1 text-[#FFFFFF]">{rating} </span> 
            </div>
            <div className="flex-1">
                <span 
                    className={`text-left ${
                        difficulty === 2 ? 'text-red' : 
                        difficulty === 1 ? 'text-yellow-300' :
                        'text-green-300' 
                    }`}
                >
                    {difficulty === 2 ? 'Hard' : difficulty === 1 ? 'Medium' : 'Easy'}
                </span>
            </div>

            <div className="flex flex-1">
                <span className="text-left mt-auto mb-auto text-[#FFFFFF]">
                    {acceptance} %
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
    const [packages, setPackages] = useState<Package[]>([]);
    const [problems, setProblems] = useState<ProblemInfor[]>([]);
    const [originalProblems, setOriginalProblems] = useState<ProblemInfor[]>(problems);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filters, setFilters] = useState({
        textSearch: '',
        tag: '',
        status: null as boolean | null,
        difficulty: null as number | null,
      });

    useEffect(() => {
        const fetchPackages = async () => {
          try {
            const data = await PackageService.getPackages();
            setPackages(data); 
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            console.log(error);
          } 
        };

        const fetchAllProblems = async () => {
            // try {
                const data = await PackageService.getAllProblem();
                await Promise.all(data.map(async (problem) => {
                  const rating = await PackageService.getRatingOfProblem(problem.id); // Gọi API để lấy rating cho mỗi phần tử
                  return {
                    ...problem, // Giữ lại tất cả các thuộc tính của problem
                    rating, // Thêm thông tin rating vào object
                  };
                }));
              setProblems(data); 
              setOriginalProblems(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            // } catch (error) {
            //   console.log(error);
            // } 
          };

        //fetchPackages();
        //fetchAllProblems();
        setOriginalProblems(probleM);
        handleFilterChange();
        setProblems(probleM);
    }, [originalProblems]);

    useEffect(() => {
        handleFilterChange(); // Mỗi khi filters thay đổi, lọc lại dữ liệu
    }, [filters]);
    
    const handleSort = (field: keyof ProblemInfor) => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        
        const sortedProblems = [...problems].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];
        
            if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                return newOrder === 'asc' ? (valueA ? 1 : 0) - (valueB ? 1 : 0) : (valueB ? 1 : 0) - (valueA ? 1 : 0);
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                return newOrder === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else if (typeof valueA === 'number' && typeof valueB === 'number') {
                return newOrder === 'asc' ? valueA - valueB : valueB - valueA;
            }
            return 0;
        });      
        setProblems(sortedProblems);
    };  
    
    const handleFilterChange = () => {
        const { textSearch, tag, status, difficulty } = filters;      
        if (!textSearch && !tag && status === null && difficulty === null) {
            setProblems(originalProblems);
            return;
        }
        let filteredProblems = [...originalProblems];    
        if (textSearch) {
            filteredProblems = filteredProblems.filter(problem =>
                problem.title.toLowerCase().includes(textSearch.toLowerCase())
            );
        }
        if (tag) {
            filteredProblems = filteredProblems.filter(problem =>
                problem.title.toLowerCase().includes(tag.toLowerCase())
            );
        }
        if (status !== null) {
            filteredProblems = filteredProblems.filter(problem => problem.status === status);
        }
        if (difficulty !== null) {
            filteredProblems = filteredProblems.filter(problem => problem.difficulty === difficulty);
        }
        setProblems(filteredProblems);
    };    

    const handleTagSelect = (content: string) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          tag: prevFilters.tag === content ? '' : content,  // Nếu tag đã chọn trước đó thì bỏ chọn
        }));
      };
      
    const handleSolvedChange = (value: boolean | null) => {
    setFilters(prevFilters => ({
        ...prevFilters,
        status: prevFilters.status === value ? null : value,
    }));
    };
      
    const handleDifficultyChange = (value: number | null) => {
    setFilters(prevFilters => ({
        ...prevFilters,
        difficulty: prevFilters.difficulty === value ? null : value, 
    }));
    };        

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-l from-green-500 to-textcolorlight">            
            <div className="flex-col flex-grow px-16 py-2 mt-28">
                <div className="flex-grow ">
                    <h1 className="text-xl font-bold text-left text-[#FFFFFF]">Package</h1> 
                    <div className="flex overflow-x-auto space-x-7 whitespace-nowrap scrollbar-hide">
                        {packages.map((pkg, index) => (
                            <DivPackage
                                key={index}
                                content={pkg.content}
                                update_At = {new Date(pkg.update_At)}
                                numberParticipants={pkg.numberParticipants}
                                levels={pkg.levels}
                                icon={icons[index % icons.length]} 
                                color={colors[index % colors.length]}
                            />
                        ))}
                    </div>

                </div>

                <div className="flex-grow mt-10 mr-7">
                    <h1 className="text-left text-xl font-bold text-[#FFFFFF] mb-4 ">All Problems</h1>   
                    <div className="flex min-w-screen space-x-7">
                        <div className="bg-[#ffffff] flex-none w-3/5 bg-opacity-10 px-4 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                            <div className="bg-[#ffffff] flex bg-opacity-10 px-4 py-1 rounded shadow-2xl">
                                <div className="flex flex-1">
                                    <span className="text-xs text-left text-[#FFFFFF] mt-auto mb-auto">STATUS</span>   
                                    <button onClick={() => handleSort('status')}>
                                        <img
                                            className="flex-none object-cover w-2 h-2 mt-auto mb-auto ml-1"
                                            src={arrange}
                                            alt="icon"
                                        />
                                    </button>                                    
                                </div>
                                <div className="flex-none w-1/3 "><span className="text-xs text-left text-[#FFFFFF]">TITLE</span></div>
                                <div className="flex flex-1">
                                    <span className="text-xs text-left mt-auto mb-auto text-[#FFFFFF]">RATING</span>   
                                    <button onClick={() => handleSort('rating')}>
                                        <img
                                            className="flex-none object-cover w-2 h-2 mt-auto mb-auto ml-1"
                                            src={arrange}
                                            alt="icon"
                                        />
                                    </button>
                                </div>
                                <div className="flex-1 "><span className="text-xs text-left text-[#FFFFFF]">DIFFICULTY</span></div>
                                <div className="flex flex-1">
                                    <span className="text-xs text-left mt-auto mb-auto text-[#FFFFFF]">ACCEPTANCE</span>   
                                    <button onClick={() => handleSort('numOfAcceptance')}>
                                        <img
                                            className="flex-none object-cover w-2 h-2 mt-auto mb-auto ml-1"
                                            src={arrange}
                                            alt="icon"
                                        />
                                    </button>
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
                                        acceptance={problem.numOfSubmission === 0 ? 0 : parseFloat((problem.numOfAcceptance / problem.numOfSubmission * 100).toFixed(1))}                                         
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
                                    value={filters.textSearch} 
                                    onChange={(e) => {
                                        setFilters(prev => ({ ...prev, textSearch: e.target.value }));
                                    }}
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
                                                isSelected={filters.tag === tag}
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
                                            checked={filters.status === true} 
                                            onChange={() => handleSolvedChange(true)} 
                                            className="mr-2 custom-checkbox" 
                                        />Solved
                                    </label>
                                    <label className="flex items-center text-[#FFFFFF]">
                                        <input 
                                            type="checkbox" 
                                            checked={filters.status === false} 
                                            onChange={() => handleSolvedChange(false)} 
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
                                            checked={filters.difficulty === 0} 
                                            onChange={() => handleDifficultyChange(0)} 
                                            className="mr-2 custom-checkbox" 
                                        />Easy
                                    </label>
                                    <label className="flex items-center mb-2 text-[#FFFFFF]">
                                        <input 
                                            type="checkbox" 
                                            checked={filters.difficulty === 1} 
                                            onChange={() => handleDifficultyChange(1)} 
                                            className="mr-2 custom-checkbox"  
                                        />Medium
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={filters.difficulty === 2} 
                                            onChange={() => handleDifficultyChange(2)} 
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

const colors = ["#8B79F1", "#DF4A52", "#F4AB04", "#1CE496"];
const icons = [package1, package2, package3, package4];

const tags = ["Array", "String", "Sorting", "Dynamic Programming", "Math", "Hash Table"];


const probleM = [
    { status: true, title: "Solve Me First", rating: 4.0, difficulty: 0, numOfAcceptance: 53, numOfSubmission: 100 },
    { status: true, title: "Simple Array Sum", rating: 3.5, difficulty: 1, numOfAcceptance: 41 , numOfSubmission: 100},
    { status: true, title: "A Very Big Sum", rating: 2.8, difficulty: 2, numOfAcceptance: 34, numOfSubmission: 100},
    { status: false, title: "Reverse Integer", rating: 4.5, difficulty: 2, numOfAcceptance: 29, numOfSubmission: 100},
    { status: false, title: "Integer to Roman", rating: 5.0, difficulty: 0, numOfAcceptance: 56 , numOfSubmission: 100},
    { status: true, title: "Add Two Numbers", rating: 2.0, difficulty: 0, numOfAcceptance: 66 , numOfSubmission: 100},
    { status: true, title: "Solve Me First", rating: 4.0, difficulty: 0, numOfAcceptance: 53 , numOfSubmission: 100},
    { status: false, title: "Simple Array Sum", rating: 3.5, difficulty: 1, numOfAcceptance: 41 , numOfSubmission: 100},
    { status: true, title: "A Very Big Sum", rating: 2.8, difficulty: 1,numOfAcceptance: 34, numOfSubmission: 100},
    { status: false, title: "Reverse Integer", rating: 4.5, difficulty: 2, numOfAcceptance: 29 , numOfSubmission: 100},
    { status: false, title: "Integer to Roman", rating: 5.0, difficulty: 0, numOfAcceptance: 56, numOfSubmission: 100},
    { status: true, title: "Add Two Numbers", rating: 2.0, difficulty: 0,numOfAcceptance: 66 , numOfSubmission: 100},
];

export default Problems;
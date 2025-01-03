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
import { Package, ProblemInfor, Tag } from "../../models/package";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
    updateAgo: string; 
    numberParticipants: number; 
    levels: string[];
    icon: string;
    color: string; 
    onClick?: () => void; }> = ({ content, updateAgo, numberParticipants, levels, icon, color, onClick }) => {
    return (
        <button 
        className={`bg-[#ffffff] bg-opacity-10 px-2 py-4 rounded-xl flex-none flex flex-col w-[305px] mt-6 border-l-[6px]`} 
        style={{borderColor: color }}
        onClick={onClick} >
            <div className="flex items-center flex-none w-full">
                <img
                    className="flex-none object-cover w-10 h-10"
                    src={icon}
                    alt="icon"
                />
                <div className="flex flex-col ml-2">
                    <span className="font-bold text-left text-[#FFFFFF]">{content}</span>
                    <span className="text-xs text-left text-[#FFFFFF]">{updateAgo}</span>
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

            <div className="flex flex-none mt-auto mb-0">
                <span className="text-3xl mt-auto text-left text-[#FFFFFF]">{numberParticipants}</span>
                <span className="mt-auto mb-1 px-1 text-xs text-left text-[#FFFFFF]">participants</span>
            </div>
        </button>
    );
};

const Problem: React.FC <{
    isSolved: boolean; 
    id: number
    title: string; 
    averageRating: number; 
    difficulty: number; 
    acceptance: number; }> = ({ id, isSolved, title, averageRating, difficulty, acceptance }) => {
    
    const navigate = useNavigate()
    const handleProblemClick = () => {
        navigate("/workspace", {state: {problemId: id}})
    }
    
    return (
        <div onClick={handleProblemClick} className="flex w-full px-4 py-4 border-b border-blacklight cursor-pointer">
            <div className="flex flex-1">
                {isSolved ? (
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
                <span className="text-left mt-auto mb-auto ml-1 text-[#FFFFFF]">{averageRating.toFixed(1)} </span> 
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
    const [originalProblems, setOriginalProblems] = useState<ProblemInfor[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [pkName, setPkName] = useState<string>('All Problems');
    const [cookie, , removeCookie] = useCookies(["token"]);
    const token = cookie.token 
    const [filters, setFilters] = useState({
        textSearch: '',
        tag: [] as string[],
        isSolved: null as boolean | null,
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

        const fetchTags = async () => {
            try {
                const data = await PackageService.getTags();
                setTags(data); 
                console.log(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.log(error);
            } 
        };

        const fetchAllProblems = async () => {
            try {
                const data = await PackageService.getAllProblem(token);
                setOriginalProblems(data);               
                setProblems(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
              console.log(error);
            } 
          };       
        fetchTags();        
        fetchPackages();
        fetchAllProblems();
        handleFilterChange();
    }, []);

    useEffect(() => {
        handleFilterChange();
    }, [filters]);

    const fetchProblemsById = async (pkgId: number, pkgName: string) => {
        try {
            const data = await PackageService.getProblemsById(pkgId);
            setOriginalProblems(data);               
            setProblems(data);
            setPkName(pkgName)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.log(error);
        } 
    };
    
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
        const { textSearch, tag, isSolved, difficulty } = filters;      
        if (!textSearch && !tag && isSolved === null && difficulty === null) {
            setProblems(originalProblems);
            return;
        }
        let filteredProblems = [...originalProblems];    
        if (textSearch) {
            filteredProblems = filteredProblems.filter(problem =>
                problem.title.toLowerCase().includes(textSearch.toLowerCase())
            );
        }
        if (tag && Array.isArray(tag) && tag.length > 0) {
            filteredProblems = filteredProblems.filter(problem =>
                Array.isArray(problem.tag) && 
                tag.every(filterTag =>
                    problem.tag.some(t => t.toLowerCase() === filterTag.toLowerCase())
                )
            );
        }
        if (isSolved !== null) {
            filteredProblems = filteredProblems.filter(problem => problem.isSolved === isSolved);
        }
        if (difficulty !== null) {
            filteredProblems = filteredProblems.filter(problem => problem.difficulty === difficulty);
        }
        setProblems(filteredProblems);
    };    

    const handleTagSelect = (content: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            tag: prevFilters.tag.includes(content)
                ? prevFilters.tag.filter(tag => tag !== content)
                : [...prevFilters.tag, content]
        }));
    };

    const handleSolvedChange = (value: boolean | null) => {
    setFilters(prevFilters => ({
        ...prevFilters,
        isSolved: prevFilters.isSolved === value ? null : value,
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
                                updateAgo = {pkg.updatedAgo}
                                numberParticipants={pkg.numberParticipants}
                                levels={pkg.levels}
                                icon={icons[index % icons.length]} 
                                color={colors[index % colors.length]}
                                onClick={() => fetchProblemsById(pkg.id, pkg.content)}
                            />
                        ))}
                    </div>

                </div>

                <div className="flex-grow mt-10 mr-7">
                    <h1 className="text-left text-xl font-bold text-[#FFFFFF] mb-4 ">{pkName}</h1>   
                    <div className="flex min-w-screen space-x-7">
                        <div className="bg-[#ffffff] flex-none w-3/5 bg-opacity-10 px-4 py-4 rounded-xl shadow-2xl flex-col space-y-3">
                            <div className="bg-[#ffffff] flex bg-opacity-10 px-4 py-1 rounded shadow-2xl">
                                <div className="flex flex-1">
                                    <span className="text-xs text-left text-[#FFFFFF] mt-auto mb-auto">STATUS</span>   
                                    <button onClick={() => handleSort('isSolved')}>
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
                                    <button onClick={() => handleSort('averageRating')}>
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

                            <div className="flex flex-col overflow-y-auto max-h-[680px]"
                            onClick={() => console.log('Div clicked!')}>
                                {problems.map((problem, index) => (
                                    <Problem 
                                        key={index} 
                                        isSolved={problem.isSolved}  
                                        id={problem.id}
                                        title={problem.title} 
                                        averageRating={problem.averageRating}  
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
                                                content={tag.name} 
                                                onSelect={handleTagSelect}
                                                isSelected={filters.tag.includes(tag.name)}
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
                                            checked={filters.isSolved === true} 
                                            onChange={() => handleSolvedChange(true)} 
                                            className="mr-2 custom-checkbox" 
                                        />Solved
                                    </label>
                                    <label className="flex items-center text-[#FFFFFF]">
                                        <input 
                                            type="checkbox" 
                                            checked={filters.isSolved === false} 
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
// const tag = ["Array", "String", "Sorting", "Dynamic Programming", "Math", "Hash Map"];
export default Problems;
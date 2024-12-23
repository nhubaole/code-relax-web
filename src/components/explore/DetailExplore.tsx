import Footer from "../profile/Footer";
import quizs from "../../assets/quizs.svg";
import icquestion from "../../assets/question.svg";
import down from "../../assets/direction_down.svg";
import image from "../../assets/detailexplore.png";
import React, { useState } from "react";
interface DeatailExploreProps {
    isLoggedIn: boolean;
  }
  
const DeatailExplore: React.FC<DeatailExploreProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [correctAns, setCorrectAns] = useState(0);

    const handleSubmit = () => {
        setIsSubmit(true); 
        let correctCount = 0;
        Object.entries(selectedAnswer).forEach(([index, answer]) => {
          const q = questions[parseInt(index)];
          if (q.correctAnswer === answer) {
            correctCount += 1;
          }
        });
        setCorrectAns(correctCount);
    };

    const handleClick = (index: number, optionKey: string) => {
      setSelectedAnswer((prev) => ({
        ...prev,
        [index]: optionKey,
      }));
    };

    const handleQuizs = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className="relative flex flex-col min-h-screen bg-black">            
            <div className="flex-col flex-grow px-16 py-2 mt-28">
                <div className="flex flex-col justify-center mt-6 space-y-8">                    
                    <h1 className="font-bold text-3xl text-center text-[#FFFFFF]">What is cryptocurrency? all you need to know</h1>
                </div>

                <img
                    className="w-full h-[380px] mt-14"
                    src={image}
                    alt="Background"
                />

                <div className="mt-10 bg-[#ffffff] bg-opacity-10 w-full rounded-xl px-10 py-14">
                    <span className="text-yellow-300">{explore.introduction}</span>
                    <div className="mt-10">
                        {explore.chapters.map((chapter, index) => (
                        <div key={index} className="mt-10">
                            <span className="text-xl text-green-300">{chapter.title}</span>
                            <p className="mt-2 text-[#ffffff]">
                                {chapter.content.split("\n").map((line, idx) => (
                                    <React.Fragment key={idx}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 bg-[#ffffff] bg-opacity-10 w-full rounded-xl px-10 py-4">
                    <button className="flex items-center flex-none w-full "
                        type="button"
                        onClick={handleQuizs}>
                        <img
                            className="flex-none object-cover w-[20px] h-[20px]"
                            src={quizs}
                            alt="icon"
                        />
                        <span className="text-left text-sm ml-2 text-[#FFFFFF]">QUIZS</span>
                        {props.isLoggedIn ? (
                            <div className="ml-auto text-green-300">Please log in to continue.</div>
                            ) : (
                            <label htmlFor="fileInput" className="ml-auto cursor-pointer">
                                <img src={down} alt="Icon" className="w-6 h-6"/>
                            </label> )}
                    </button>
                    
                    {isSubmit && (
                        <p className="text-green-300"><span className="text-3xl font-bold">{correctAns}</span> /{questions.length} Correct Answers</p>
                    )}

                    {isVisible && !props.isLoggedIn && (
                        <div>
                            {questions.map((q, index) => (
                            <div key={index} className="py-4 mt-4 mb-12 text-[#FFFFFF] border-t border-[#FFFFFF] border-opacity-40">
                                <div className="flex items-center flex-none w-full">
                                <img
                                    className="flex-none object-cover w-[20px] h-[20px]"
                                    src={icquestion}
                                    alt="icon"
                                />
                                <span className="ml-2 text-sm text-left">Question {index+1}</span>
                                </div>
                                
                                <div className="mt-4 border border-[#FFFFFF] border-opacity-40 rounded-lg px-6 py-4 bg-black">
                                    <p >{q.question}</p>
                                </div>

                                <div>
                                    {Object.entries(q.options).map(([key, value]) => {
                                        const isSelected = selectedAnswer[index] === key;
                                        const isCorrect = key === q.correctAnswer;

                                        const buttonClass = isSubmit
                                            ? isCorrect
                                            ? "border-green-500"
                                            : isSelected
                                            ? "border-red"
                                            : "border-[#FFFFFF]"
                                            : isSelected
                                            ? "bg-purple-500"
                                            : "";

                                        return (
                                            <button
                                            key={key}
                                            className={`w-full mt-4 border rounded-lg px-4 py-2 text-left ${buttonClass}`}
                                            onClick={() => !isSubmit && handleClick(index, key)}
                                            disabled={isSubmit}
                                            >
                                            <label htmlFor={key} className="ml-2">{value}</label>
                                            </button>
                                        );
                                    })}
                                </div>

                                {isSubmit && (
                                    <div className="mt-4 px-6 py-2 bg-[#ffffff] bg-opacity-10 rounded-xl">
                                        <p className="text-yellow-300">Explanation</p>
                                        <p className="text-sm">{q.explanation}</p>
                                    </div>
                                )}
                            </div>
                            ))}

                            <button 
                            className="mt-10 ml-auto bg-yellow-300 text-black w-[200px] rounded-2xl py-1 flex items-center justify-center"
                            onClick={handleSubmit}
                            style={{ display: isSubmit ? "none" : "flex" }}>
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>            
            <Footer />
        </div>   
    );
};

const questions = [
    {
        question: "What does UI stand for in the context of design?",
        options: {
            a: "A. User Integration",
            b: "B. User Interface",
            c: "C. Universal Interaction",
            d: "D. User Involvement"
        },
        correctAnswer: "b",  
        explanation: "Cryptocurrency is more than just digital money; it represents a shift in how we view and handle financial transactions.",
    },
    {
        question: "What does UI stand for in the context of design?",
        options: {
            a: "A. User Integration",
            b: "B. User Interface",
            c: "C. Universal Interaction",
            d: "D. User Involvement"
        },
        correctAnswer: "a",  
        explanation: "Cryptocurrency is more than just digital money; it represents a shift in how we view and handle financial transactions.",
    }
  ];
  
const explore = { 
    introduction: "Cryptocurrency has become one of the most discussed topics in the digital world. From its mysterious origins to its widespread adoption, this revolutionary form of currency has significantly impacted how we think about money, transactions, and financial systems. Whether you're a beginner or looking to expand your understanding, this guide covers all the basics you need to know about cryptocurrency.", 
    chapters: [
        {
            title: "1. What is Cryptocurrency?",
            content: "At its core, cryptocurrency is a form of digital or virtual currency that uses cryptography for security. Unlike traditional currencies like the US Dollar or Euro, cryptocurrencies operate on decentralized networks based on blockchain technology—a distributed ledger that records all transactions transparently and securely.\n"+
            " Cryptocurrencies are not controlled by any central authority like governments or banks. Instead, they rely on peer-to-peer networks to validate transactions, making them resistant to censorship and fraud."
        },
        {
            title: "2. How Does Cryptocurrency Work?",            
            content: "Cryptocurrencies use blockchain technology, which is essentially a chain of blocks containing transaction data. Here's a simplified process of how it works:"
                    + "\n1. Transaction Initiation: A user initiates a transaction by sending cryptocurrency to another user."
                    + "\n2. Transaction Verification: Transactions are broadcast to a network of computers (nodes), which verify the transaction's authenticity using complex algorithms."
                    + "\n3. Block Creation: Verified transactions are grouped into a block, which is added to the blockchain."
                    + "\n4. Mining: Miners solve cryptographic puzzles to validate blocks. Once solved, the block is permanently added to the blockchain, and miners are rewarded with new cryptocurrency."
                    + "\n5. This decentralized system ensures transparency, immutability, and security for all transactions."
        },
        {
            title: "3. Key Features of Cryptocurrency",            
            content: "- Decentralization: Operates without a central authority."
                    + "\n- Transparency: Blockchain technology provides a public ledger accessible to anyone."
                    + "\n- Security: Cryptographic techniques ensure that transactions are tamper-proof."
                    + "\n- Anonymity: Users can make transactions without revealing their identities."
                    + "\n- Global Accessibility: Cryptocurrencies can be used anywhere with internet access."
        }
    ]
};

export default DeatailExplore;
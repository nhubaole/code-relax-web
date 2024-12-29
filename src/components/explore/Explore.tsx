import Footer from "../profile/Footer";
import unsplash from "../../assets/unsplash.png";
import { Link } from "react-router-dom";

const Topic: React.FC <{
    name: string; 
    image: string;
    content:string}> = ({ name, image, content }) => {
    return (
        <Link to="/detailexplore" className="w-[275px] h-[320px] bg-[#ffffff] bg-opacity-20 rounded-3xl flex flex-col overflow-hidden border border-[#ffffff] border-opacity-40">
            <img
                className="w-full h-[170px]"
                src={image}
                alt="Background"
            />
            <p className="px-4 mt-4 font-medium text-left text-[#ffffff]">{name}</p>
            <p className="px-4 mt-3 mb-4 text-left text-sm text-[#ffffff]">{content}</p>
        </Link>
    );
};

const Explore = () => {
    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-l from-green-500 to-textcolorlight ">            
            <div className="flex-col flex-grow px-16 py-2 mt-28">
                <div className="flex flex-col justify-center mt-6 space-y-8">
                    <h1 className="font-bold text-3xl text-center text-[#FFFFFF]">Learn About Programming</h1>
                    <p className="text-center text-[#FFFFFF]">Learn essential programming skills to build your future in technology</p>
                </div>

                <div className="container p-6 overflow-x-auto ">
                    <table className="w-full table-fixed border-spacing-4">
                        <tr>
                            <td colSpan={2} className="relative p-4 text-center h-[350px] ">
                                <img src={unsplash} alt="Background" className="w-full h-full " />
                                <p className="absolute bottom-14 left-4 font-bold text-4xl text-left text-[#FFFFFF] p-4">
                                    All about Investing in NFTs and related risks
                                </p>
                            </td>
                            <td className="p-4 text-center">
                                <Topic
                                    name="What is cryptocurrency? all you need to know"
                                    image={unsplash}
                                    content="Cryptocurrencies are basically digital assets. It is secured by cryptography.. "
                                />
                            </td>
                            <td className="p-4 text-center">
                                <Topic
                                    name="What is cryptocurrency? all you need to know"
                                    image={unsplash}
                                    content="Cryptocurrencies are basically digital assets. It is secured by cryptography.. "
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="p-4 text-center">
                                <Topic
                                    name="What is cryptocurrency? all you need to know"
                                    image={unsplash}
                                    content="Cryptocurrencies are basically digital assets. It is secured by cryptography.. "
                                />
                            </td>
                            <td className="p-4 text-center">
                                <Topic
                                    name="What is cryptocurrency? all you need to know"
                                    image={unsplash}
                                    content="Cryptocurrencies are basically digital assets. It is secured by cryptography.. "
                                />
                            </td>
                            <td className="p-4 text-center">
                                <Topic
                                    name="What is cryptocurrency? all you need to know"
                                    image={unsplash}
                                    content="Cryptocurrencies are basically digital assets. It is secured by cryptography.. "
                                />
                            </td>
                            <td className="p-4 text-center">
                                <Topic
                                    name="What is cryptocurrency? all you need to know"
                                    image={unsplash}
                                    content="Cryptocurrencies are basically digital assets. It is secured by cryptography.. "
                                />
                            </td>
                        </tr>
                    </table>
                </div>

            </div>            
            <Footer />
        </div>   
    );
};

export default Explore;
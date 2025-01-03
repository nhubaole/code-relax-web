import Footer from "../profile/Footer";
import unsplash from "../../assets/unsplash.png";
import { Link } from "react-router-dom";
import { ArticleGetAllReq } from "../../models/article";
import { useEffect, useState } from "react";
import ArticleService from "../../services/ArticleService";
import { useCookies } from "react-cookie";

const Topic: React.FC<{
  id: number;
  name: string;
  content: string;
  cover: string;
}> = ({ id, name, content, cover }) => {
  return (
    <Link
      to={`/detailexplore/${id}`}
      className=" bg-[#ffffff] bg-opacity-20 rounded-3xl flex flex-col w-72 overflow-hidden border border-[#ffffff] border-opacity-40"
    >
      <img
        className="w-full h-[170px] object-cover"
        src={cover}
        alt="Background"
      />
      <p className="px-4 mt-4 font-medium text-left text-[#ffffff]">{name}</p>
      <p className="px-4 mt-3 mb-4 text-left text-sm text-[#ffffff]">
        {content}
      </p>
    </Link>
  );
};

const renderTopics = (startIndex: number, topics: ArticleGetAllReq[]) => {
  const rows = [];
  for (let i = startIndex; i < topics.length; i += 4) {
    rows.push(
      <tr key={i}>
        {topics.slice(i, i + 4).map((topic, index) => (
          <td key={index} className="w-1/4 p-4 text-center align-top">
            <Topic
              id={topic.id}
              name={topic.title}
              content={topic.summary}
              cover={topic.cover}
            />
          </td>
        ))}
        {[...Array(4 - (topics.length % 4))].map((_, index) => (
          <td key={`empty-${index}`} className="p-4 text-center"></td>
        ))}
      </tr>
    );
  }
  return rows;
};

const Explore = () => {
  const [topics, setTopics] = useState<ArticleGetAllReq[]>([]);
  const [cookie, , removeCookie] = useCookies(["token"]);
  const token = cookie.token;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleService = new ArticleService();
        const data = await articleService.getAll(token);
        setTopics(data.data.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-l from-green-500 to-textcolorlight ">
      <div className="flex-col flex-grow px-16 py-2 mt-28">
        <div className="flex flex-col justify-center mt-6 space-y-8">
          <h1 className="font-bold text-3xl text-center text-[#FFFFFF]">
            Learn About Programming
          </h1>
          <p className="text-center text-[#FFFFFF]">
            Learn essential programming skills to build your future in
            technology
          </p>
        </div>

        <div className="container p-6 overflow-x-auto ">
          <table className="w-full table-fixed border-spacing-4">
            <tr>
              <td
                colSpan={4}
                className="relative p-4 text-center h-[320px] w-1/2"
              >
                {topics.length > 0 && (
                  <Link to={`/detailexplore/${topics[0].id}`}>
                    <div className="relative h-[320px]">
                      <img
                        src={topics[0].cover}
                        alt="Background"
                        className="w-full h-full rounded-3xl object-cover"
                      />
                      <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
                      <p className="absolute bottom-14 left-4 font-bold text-4xl text-left text-[#FFFFFF] p-4">
                        {topics[0].title}
                      </p>
                      <p className="absolute bottom-6 left-4 text-xl text-left text-[#FFFFFF] p-4">
                        {topics[0].summary}
                      </p>
                    </div>
                  </Link>
                )}
              </td>
              {topics.slice(1, 3).map((topic, index) => (
                <td
                  key={index}
                  className="p-4 text-center  justify-center"
                >
                  <Topic
                    id={topic.id}
                    name={topic.title}
                    content={topic.summary}
                    cover={topic.cover}
                  />
                </td>
              ))}
            </tr>
            {renderTopics(3, topics)}
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Explore;

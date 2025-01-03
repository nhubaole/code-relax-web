import Footer from "../profile/Footer";
import quizs from "../../assets/quizs.svg";
import icquestion from "../../assets/question.svg";
import down from "../../assets/direction_down.svg";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ArticleService from "../../services/ArticleService";
import { ArticleByIdReq, Quiz } from "../../models/article";
import { useCookies } from "react-cookie";
interface DeatailExploreProps {
  isLoggedIn: boolean;
}

const DeatailExplore: React.FC<DeatailExploreProps> = (props) => {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [correctAns, setCorrectAns] = useState(0);
  const [article, setArticle] = useState<ArticleByIdReq | null>(null);
  const [cookie, , removeCookie] = useCookies(["token"]);
  const token = cookie.token

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleService = new ArticleService();

        const data = await articleService.getByID(id, token);
        setArticle(data.data.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = () => {
    setIsSubmit(true);
    if (!article?.quizzes || article.quizzes.length === 0) {
      console.log("Không có câu hỏi nào trong bài quiz.");
      setCorrectAns(0);
      return;
    }

    let correctCount = 0;
    Object.entries(selectedAnswer).forEach(([index, answer]) => {
      const question = article.quizzes[parseInt(index)];
      if (question) {
        if (question.correctOption === answer) {
          correctCount++;
        }
      }
      console.log("select:", answer);
      console.log("select:", question.correctOption);
    });
    setCorrectAns(correctCount);
    console.log(`Kết quả: ${correctCount}/${article.quizzes.length} câu đúng.`);
  };

  const handleOptionClick = (index, option) => {
    const selectedOption = ["A", "B", "C", "D"][option];
    setSelectedAnswer((prevState) => {
      const newSelectedAnswer = [...prevState];
      newSelectedAnswer[index] = selectedOption;
      return newSelectedAnswer;
    });
  };

  const handleQuizs = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      <div className="flex-col flex-grow px-16 py-2 mt-28">
        <div className="flex flex-col justify-center mt-6 space-y-8">
          <h1 className="font-bold text-3xl text-center text-[#FFFFFF]">
            {article?.title || "Loading..."}
          </h1>
        </div>

        <img
          className="w-full h-[380px] mt-14 rounded-xl object-contain"
          src={article?.cover}
          alt="Background"
        />

        <div className="mt-10 bg-[#ffffff] bg-opacity-10 w-full rounded-xl px-10 py-14">
          <span className="text-yellow-300">
            {article?.summary || "Loading..."}
          </span>
          <div className="mt-10">
            {article?.subTitle.map((subtitle, index) => (
              <div key={index} className="mt-10">
                <span className="text-xl text-green-300">{subtitle}</span>
                <p className="mt-2 text-[#ffffff]">
                  {article.content[index].split("\n").map((line, idx) => (
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
          <button
            className="flex items-center flex-none w-full "
            type="button"
            onClick={handleQuizs}
          >
            <img
              className="flex-none object-cover w-[20px] h-[20px]"
              src={quizs}
              alt="icon"
            />
            <span className="text-left text-sm ml-2 text-[#FFFFFF]">QUIZS</span>
            {!props.isLoggedIn ? (
              <div className="ml-auto text-green-300">
                Please log in to continue.
              </div>
            ) : (
              <label htmlFor="fileInput" className="ml-auto cursor-pointer">
                <img src={down} alt="Icon" className="w-6 h-6" />
              </label>
            )}
          </button>

          {isSubmit && (
            <p className="text-green-300">
              <span className="text-3xl font-bold">{correctAns}</span> /
              {article?.quizzes.length} Correct Answers
            </p>
          )}

          {isVisible && props.isLoggedIn && (
            <div>
              {article?.quizzes.map((q, index) => (
                <div
                  key={index}
                  className="py-4 mt-4 mb-12 text-[#FFFFFF] border-t border-[#FFFFFF] border-opacity-40"
                >
                  <div className="flex items-center flex-none w-full">
                    <img
                      className="flex-none object-cover w-[20px] h-[20px]"
                      src={icquestion}
                      alt="icon"
                    />
                    <span className="ml-2 text-sm text-left">
                      Question {index + 1}
                    </span>
                  </div>

                  <div className="mt-4 border border-[#FFFFFF] border-opacity-40 rounded-lg px-6 py-4 bg-black">
                    <p>{q?.questionText}</p>
                  </div>

                  <div>
                    {["optionA", "optionB", "optionC", "optionD"].map(
                      (key, idx) => {
                        const value = q[key as keyof Quiz];
                        const selectedOption = selectedAnswer[index]; // Giá trị là 'A', 'B', 'C', hoặc 'D'
                        const isSelected =
                          selectedOption === ["A", "B", "C", "D"][idx];
                        const isCorrect =
                          q.correctOption === ["A", "B", "C", "D"][idx]; // So sánh với đáp án đúng

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
                            onClick={() =>
                              !isSubmit && handleOptionClick(index, idx)
                            } // Dùng idx thay vì key
                            disabled={isSubmit}
                          >
                            <label htmlFor={key} className="ml-2">
                              {value}
                            </label>
                          </button>
                        );
                      }
                    )}
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
                style={{ display: isSubmit ? "none" : "flex" }}
              >
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

export default DeatailExplore;

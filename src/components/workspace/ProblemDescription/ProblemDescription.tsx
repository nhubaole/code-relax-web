import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiStarOutline } from "react-icons/ti";
import { BiBold, BiItalic, BiCode, BiLink } from "react-icons/bi";
import {
  EasyTag,
  HardTag,
  MediumTag,
  ProblemTag,
  SolvedTag,
} from "../../../ui/tag";
import tag from "../../../assets/tag.svg";
import disscussion from "../../../assets/disscussion.svg";
import down from "../../../assets/direction_down.svg";
import up from "../../../assets/up.svg";
import { testCaseFormatter } from "../../../utils/formatter";
import { ProblemRes, TestCase } from "../../../models/problem";
import { useEffect, useState } from "react";
import { DiscussionRes } from "../../../models/discussion";
import DiscussionService from "../../../services/DiscussionService";
import { toast } from "react-toastify";
type ProblemDescriptionProps = {
  testCases: TestCase[];
  problem: ProblemRes;
  _solved: boolean;
  onTabChange: any;
  tab: string;
};

const ProblemDescription = (prop: ProblemDescriptionProps) => {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [isRatingsOpen, setIsRatingsOpen] = useState(false);

  const toggleDiscussion = () => setIsDiscussionOpen(!isDiscussionOpen);
  const toggleRatings = () => setIsRatingsOpen(!isRatingsOpen);
  const [discussions, setDiscussions] = useState<DiscussionRes[]>([]);
  const [newDiscussion, setNewDiscussion] = useState("");

  const [effects, setEffects] = useState({
    bold: false,
    italic: false,
    code: false,
    link: false,
  });

  const toggleEffect = (effect: keyof typeof effects) => {
    setEffects((prev) => ({
      ...prev,
      [effect]: !prev[effect], // Đảo trạng thái của hiệu ứng được nhấn
    }));
  };

  const tags = ["Dynamic Programing", "Array"];
  const testCasesRes = testCaseFormatter(prop.testCases);
  const acceptanceRate =
    prop.problem.numOfSubmission === 0
      ? 0
      : prop.problem.numOfAcceptance / prop.problem.numOfSubmission;

  useEffect(() => {
    const fetchdiscussion = async () => {
      const discussionService = new DiscussionService();
      const response = await discussionService.getByProblemID(prop.problem.id);
      const data = response.data.data;
      setDiscussions(data);
    };
    fetchdiscussion();
  }, [prop.problem.id]);

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.trim()) {
      alert("Discussion content cannot be empty!");
      return;
    }

    try {
      const discussionService = new DiscussionService();

      const createResponse = await discussionService.create({
        content: newDiscussion,
        type: "text",
        userID: 3,
        problemID: prop.problem.id,
      });

      if (createResponse.status === 201) {
        const id = createResponse.data.data;

        const getResponse = await discussionService.getByID(id);
        if (getResponse.status === 200) {
          const newDiscussionData = getResponse.data.data;

          setDiscussions((prevDiscussions) => [
            ...prevDiscussions,
            newDiscussionData,
          ]);

          setNewDiscussion("");
        } else {
          toast.error("Failed to fetch discussion details. Please try again.");
        }
      } else {
        toast.error("Failed to create discussion. Please try again.");
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
      toast.error(
        "Error occurred while creating discussion. Please try again."
      );
    }
  };
  const ratings = {
    overall: 4.5,
    totalReviews: 653,
    breakdown: {
      5: 80,
      4: 60,
      3: 40,
      2: 20,
      1: 10,
    },
  };

  const maxRatingCount = Math.max(...Object.values(ratings.breakdown));
  return (
    <div className="bg-[#1E1E1E] rounded-lg">
      <div className="flex h-11 w-full bg-blacklight items-center rounded-t-lg pt-2 text-[#FFF]">
        <div
          className={`rounded-t-[5px] px-5 py-[10px] text-base font-bold ${
            prop.tab === "description" ? "text-green-300" : "text-gray"
          } cursor-pointer`}
          onClick={
            () => prop.onTabChange("description")
           
          }
        >
          Description
        </div>

        <div
          className={`rounded-t-[5px] px-5 py-[10px] text-base font-bold ${
            prop.tab === "submission" ? "text-green-300" : "text-gray"
          } cursor-pointer`}
          onClick={() => prop.onTabChange("submission")}
        >
          Submission
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          <div className="break-all">
            <div className="flex space-x-4 items-center justify-between">
              <div className="flex mr-32 text-[#FFF] space-x-3">
                {prop.problem.difficulty === 1 ? (
                  <EasyTag />
                ) : prop.problem.difficulty === 2 ? (
                  <MediumTag />
                ) : (
                  <HardTag />
                )}
                <h1 className="text-2xl font-bold">{prop.problem?.title}</h1>
              </div>
              {prop._solved && <SolvedTag />}
            </div>
            <div className="flex mt-4 items-center space-x-2">
              <img src={tag} alt="" />
              <h1 className="text-gray font-medium">TAGS</h1>
              {tags.map((value) => (
                <ProblemTag name={value} />
              ))}
            </div>
            <div className="flex items-center mt-3">
              <div className="flex space-x-1 cursor-pointer rounded p-[3px] text-xl transition-colors duration-200 text-[#FFF]">
                {[...Array(5)].map((_, index) => (
                  <TiStarOutline key={index} className="text-[#FFF]" />
                ))}
              </div>
            </div>

            <div
              className="text-[#FFF] mt-4 whitespace-normal break-words"
              dangerouslySetInnerHTML={{ __html: prop.problem.explaination }}
            ></div>

            <div className="mt-4">
              {testCasesRes.map((example, index) => (
                <div className="mt-5" key={example.id}>
                  <p className="font-bold text-green-300">
                    Example {index + 1}:
                  </p>
                  <div className="text-gray bg-blacklight space-y-3 mt-3 px-3 py-2 rounded-lg">
                    <pre className="whitespace-pre-wrap break-words">
                      <strong className="text-gray">Input: </strong>
                      {example.input}
                      <br />
                      <strong className="text-gray">Output:</strong>{" "}
                      {example.output}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg text-white ">
              <div className="flex justify-between text-start">
                <div>
                  <p className="text-purple-300 font-medium">ACCEPTED:</p>
                  <p className="font-bold text-[#FFF]">
                    {prop.problem?.numOfAcceptance}
                  </p>
                </div>
                <div>
                  <p className="text-purple-300 font-medium">SUBMISSIONS:</p>
                  <p className="font-bold text-[#FFF]">
                    {prop.problem?.numOfSubmission}
                  </p>
                </div>
                <div>
                  <p className="text-purple-300 font-medium">
                    ACCEPTANCE RATE:
                  </p>
                  <p className="font-bold text-[#FFF]">{acceptanceRate}</p>
                </div>
              </div>

              <div
                className={`flex mt-4 items-center justify-between p-4 bg-blacklight rounded-t-xl ${
                  isDiscussionOpen ? "rounded-b-none" : "rounded-b-xl"
                } cursor-pointer`}
                onClick={toggleDiscussion}
              >
                <div className="flex items-center space-x-2 text-[#FFF]">
                  <img src={disscussion} alt="" />
                  <span className="font-bold">DISCUSSION</span>
                </div>
                <span>
                  {isDiscussionOpen ? (
                    <img src={up} alt="" />
                  ) : (
                    <img src={down} alt="" />
                  )}
                </span>
              </div>
              {isDiscussionOpen && (
                <div className="p-4 bg-blacklight rounded-b-xl">
                  {/* Editor Section */}
                  <div className="bg-black p-3 rounded-lg mb-4 text-gray">
                    <div className="flex items-center space-x-5 mb-2 text-[#fff]">
                      <BiBold
                        className={`cursor-pointer ${
                          effects.bold ? "text-green-500" : "text-[#fff]"
                        }`}
                        onClick={() => toggleEffect("bold")}
                      />
                      <BiItalic
                        className={`cursor-pointer ${
                          effects.italic ? "text-green-500" : "text-[#fff]"
                        }`}
                        onClick={() => toggleEffect("italic")}
                      />
                      <BiCode
                        className={`cursor-pointer ${
                          effects.code ? "text-green-500" : "text-[#fff]"
                        }`}
                        onClick={() => toggleEffect("code")}
                      />
                      <BiLink
                        className={`cursor-pointer ${
                          effects.link ? "text-green-500" : "text-[#fff]"
                        }`}
                        onClick={() => toggleEffect("link")}
                      />
                    </div>
                    <textarea
                      placeholder="Aa"
                      className="w-full bg-[#1E1E1E] text-gray-400 p-2 rounded-md outline-none resize-none"
                      value={newDiscussion}
                      onChange={(e) => {
                        let content = e.target.value;

                        if (effects.bold) {
                          content = `**${content}**`; // Thêm hiệu ứng Bold
                        }

                        if (effects.italic) {
                          content = `_${content}_`; // Thêm hiệu ứng Italic
                        }

                        if (effects.code) {
                          content = `\`${content}\``; // Thêm hiệu ứng Code
                        }

                        setNewDiscussion(content);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleCreateDiscussion();
                        }
                      }}
                    ></textarea>
                  </div>
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="flex items-start space-x-4 my-4"
                    >
                      <img
                        src={""}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="text-gray">
                        <p className="font-bold text-[#fff]">
                          {discussion.user?.displayName || "Anonymous"}
                        </p>
                        <p>{discussion.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`flex items-center mt-4 justify-between p-4 bg-blacklight rounded-t-xl ${
                  isRatingsOpen ? "rounded-b-none" : "rounded-b-xl"
                } cursor-pointer`}
                onClick={toggleRatings}
              >
                <div className="flex items-center space-x-2">
                  <AiOutlineStar className="text-gray text-2xl" />
                  <span className="font-bold text-[#FFF]">
                    {ratings.overall} RATINGS
                  </span>
                </div>
                <span>
                  {isRatingsOpen ? (
                    <img src={up} alt="" />
                  ) : (
                    <img src={down} alt="" />
                  )}
                </span>
              </div>
              {isRatingsOpen && (
                <div className="p-4 bg-blacklight rounded-b-lg">
                  <div className="flex items-center space-x-8 bg-black p-4 rounded-xl">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center mb-4">
                        <p className="text-4xl font-bold text-[#FFF]">
                          {ratings.overall}
                        </p>
                        <AiFillStar className="text-yellow-500 text-2xl ml-2" />
                      </div>
                      <p className="text-gray bg-[#444] px-4 py-1 rounded-full w-max">
                        {ratings.totalReviews} reviews
                      </p>
                    </div>

                    <div className="mt-4 flex-1 space-y-2">
                      {Object.entries(ratings.breakdown)
                        .sort((a, b) => Number(b[0]) - Number(a[0])) // Sort by star level descending
                        .map(([stars, count]) => (
                          <div
                            key={stars}
                            className="flex items-center space-x-2"
                          >
                            <p className="text-gray font-medium">{stars}</p>
                            <AiFillStar className="text-yellow-500 text-sm" />
                            <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div
                                style={{
                                  width: `${(count / maxRatingCount) * 100}%`,
                                }}
                                className="h-2  rounded-full bg-gradient-to-r from-green-700 to-green-500"
                              ></div>
                            </div>
                            <p className="text-gray w-8 text-right">{count}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

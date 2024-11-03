import { AiFillStar } from "react-icons/ai";
import { TiStarOutline } from "react-icons/ti";
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
type ProblemDescriptionProps = {
  testCases: TestCase[];
  problem: ProblemRes;
  _solved: boolean;
};

const ProblemDescription = (prop: ProblemDescriptionProps) => {
  

  // const handleLike = async () => {
  //   // Handle like functionality here
  // };

  // const handleDislike = async () => {
  //   // Handle dislike functionality here
  // };

  // const handleStar = async () => {
  //   // Handle star functionality here
  // };
  const varfalse = false;

  const tags = ["Dynamic Programing", "Array"];
  const testCasesRes = testCaseFormatter(prop.testCases);
  const acceptanceRate =
    prop.problem.numOfSubmission === 0
      ? 0
      : prop.problem.numOfAcceptance / prop.problem.numOfSubmission;


  return (
    <div className="bg-[#1E1E1E] rounded-lg">
      {/* TAB */}
      <div className="flex h-11 w-full bg-blacklight items-center rounded-t-lg pt-2 text-[#FFF]">
        <div
          className={
            " rounded-t-[5px] px-5 py-[10px] text-base font-bold text-green-300 cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
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

            {/* Problem Statement(paragraphs) */}
            <div
              className="text-[#FFF] mt-4 whitespace-normal break-words"
              dangerouslySetInnerHTML={{ __html: prop.problem.explaination }}
            ></div>

            {/* Examples */}
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

            <div className="mt-6 rounded-lg text-white space-y-4">
              {/* Stats Section */}
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

              {/* Discussion Panel */}
              <div className="flex items-center justify-between p-4 bg-blacklight rounded-xl cursor-pointer">
                <div className="flex items-center space-x-2 text-[#FFF]">
                  <img src={disscussion} alt="" />
                  <span className="font-bold">DISCUSSION</span>
                </div>
                <span>
                  {varfalse ? (
                    <img src={up} alt="" />
                  ) : (
                    <img src={down} alt="" />
                  )}
                </span>
              </div>
              {
                // <div className="p-4 bg-[#333] rounded-b-lg">
                //   {/* Discussion content goes here */}
                //   <p className="text-gray-300">Discussion content goes here.</p>
                // </div>
              }

              {/* Ratings Panel */}
              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-xl cursor-pointer">
                <div className="flex items-center space-x-2">
                  <AiFillStar className="text-yellow-500 text-xl" />
                  <span className="font-bold text-[#FFF]">4.2 RATINGS</span>
                </div>
                <span>
                  {varfalse ? (
                    <img src={up} alt="" />
                  ) : (
                    <img src={down} alt="" />
                  )}
                </span>
              </div>
              {
                // <div className="p-4 bg-[#333] rounded-b-lg">
                //   {/* Ratings content goes here */}
                //   <p className="text-gray-300">Ratings content goes here.</p>
                // </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

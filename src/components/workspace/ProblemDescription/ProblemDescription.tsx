import { useEffect, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiFillStar,
} from "react-icons/ai";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {
  problemId: string;
  _solved: boolean;
};

type TestCase = {
  item1: Record<string, any>;
  item2: any;
};

export type ProblemDetail = {
  title: string;
  description: string;
  testCases: TestCase[];
  functionName: string;
  returnType: string;
  };

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problemId,
  _solved,
}) => {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [starred, setStarred] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5107/api/Problems/GetProblemDetail?problemId=${problemId}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json, text/plain",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        const data = await response.json();
        setProblem(data.data);
      } catch (error) {
        console.log("Failed to fetch problem details");
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [problemId]);

  const handleLike = async () => {
    // Handle like functionality here
  };

  const handleDislike = async () => {
    // Handle dislike functionality here
  };

  const handleStar = async () => {
    // Handle star functionality here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#1E1E1E] rounded-lg">
      {/* TAB */}
      <div className="flex h-11 w-full bg-blacklight items-center rounded-t-lg pt-2 text-[#FFF] overflow-x-hidden">
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
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-[#FFF] font-medium">
                {problem?.title}
              </div>
            </div>
            <div className="flex items-center mt-3">
              
              <div
                className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-green-300"
                onClick={handleStar}
              >
                {starred && !updating && (
                  <AiFillStar className="text-green-600" />
                )}
                {!starred && !updating && <TiStarOutline />}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
              </div>
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-[#FFF] text-sm mt-4">
              <p>{problem?.description}</p>
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem?.testCases.map((example, index) => (
                <div key={index}>
                  <p className="font-medium text-gray">Example {index + 1}:</p>
                  <div className="example-card">
                    <pre>
                      <strong className="text-gray">Input: </strong>
                      {Object.entries(example.item1).map(([key, value]) => (
                        <span key={key}>{`${key}: ${JSON.stringify(
                          value
                        )}, `}</span>
                      ))}
                      <br />
                      <strong>Output:</strong> {JSON.stringify(example.item2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints (if any) */}
            <div className="my-8 pb-4">
              <div className="text-gray text-sm font-medium">Constraints:</div>
              <ul className="text-gray ml-5 list-disc">
                {/* Add constraints here if needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
import { useEffect, useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";
import { ProblemRes, TestCase } from "../../models/problem";
import ProblemService from "../../services/ProblemService";

type WorkspaceProps = {
  problemId: number;
};

const Workspace = (prop: WorkspaceProps) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);
  const [problem, setProblem] = useState<ProblemRes>({
    id: 0,
    title: "",
    explaination: "",
    numOfAcceptance: 0,
    numOfSubmission: 0,
    difficulty: 1,
    functionName: "",
    returnType: "",
    createdAt: new Date(),
  });
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [starred, setStarred] = useState(false);
  // const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      const problemService = new ProblemService();

      const response = await problemService.getByID(1);
      const data = response.data;
      setProblem(data.data);
    };
    const fetchTestCase = async () => {
      const problemService = new ProblemService();

      const response = await problemService.getTestCaseByProblem(1);
      const data = response.data
      setTestCases(data.data);
    };

    fetchProblem();
    fetchTestCase();
  }, [prop.problemId]);

  return (
    <Split
      className="flex bg-[#151617] p-4 split overflow-hidden h-screen"
      direction="horizontal" 
      gutterSize={10}
      minSize={0}
      gutterAlign="center"
      
    >
      <ProblemDescription _solved={solved} problem={problem} testCases={testCases}/>
      <div className="">
      {testCases.length > 0 ? (
        <Playground
          testCases={testCases}
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
      ) : (
        <p>Loading...</p> // Hoặc render một loading state khác
      )}
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};
export default Workspace;

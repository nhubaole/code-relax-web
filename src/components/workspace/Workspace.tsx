import { useEffect, useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";
import { ProblemRes, TestCase } from "../../models/problem";
import ProblemService from "../../services/ProblemService";
import SubmissionsTable from "./Submission/SubmissionTable";
import SubmissionDetail from "./Submission/SubmissionDetail";
import SubmissionService from "../../services/SubmissionService";
import { SubmissionRes } from "../../models/submission";
import { useNavigate } from "react-router-dom";

type WorkspaceProps = {
  problemId: number;
};

const Workspace = (prop: WorkspaceProps) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
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
  const [submissions, setSubmissions] = useState<SubmissionRes[]>([]);
  const [tab, setTab] = useState("description");
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRes>();

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

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
      const data = response.data;
      setTestCases(data.data);
    };

    const fetchSubmission = async () => {
      const submissionService = new SubmissionService();

      const response = await submissionService.getByProblemAndUserID(3, 1);
      const data = response.data;
      setSubmissions(data.data);
    };

    fetchProblem();
    fetchTestCase();
    fetchSubmission();
  }, [prop.problemId]);

  const handleSubmissionClick = (submission: SubmissionRes) => {
    setSelectedSubmission(submission);
    setTab("submission");
  };

  const handleClickHome = () => {
    navigate("/")
  }

  return (
    <>
      <div className="pt-4 flex bg-[#151617] items-center space-x-6">
        <div className="flex items-center space-x-4 py-2 px-6 cursor-pointer" onClick={handleClickHome}>
          <div className="flex">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">CODE</h2>
            <h2 className="text-2xl font-bold text-green-300">RELAX</h2>
          </div>
        </div>
        <h1 className="text-gray font-semibold text-xl">Workspace</h1>
      </div>
      <Split
        className="flex bg-[#151617] p-4 split overflow-hidden h-screen"
        direction="horizontal"
        gutterSize={10}
        minSize={0}
        gutterAlign="center"
      >
        {/* Left Panel */}
        <div className="flex flex-col h-full">
          {tab === "submission" ? (
            <SubmissionsTable
              submissions={submissions}
              onRowClick={handleSubmissionClick}
              onTabChange={handleTabChange}
              tab={tab}
            />
          ) : (
            <ProblemDescription
              _solved={solved}
              problem={problem}
              testCases={testCases}
              onTabChange={handleTabChange}
              tab={tab}
            />
          )}
        </div>

        {/* Right Panel */}
        <div className="flex flex-col h-full">
          {tab === "submission" ? (
            <SubmissionDetail submission={selectedSubmission} />
          ) : tab === "description" || tab === "submission" ? (
            testCases.length > 0 ? (
              <Playground
                testCases={testCases}
                problem={problem}
                setSuccess={setSuccess}
                setSolved={setSolved}
              />
            ) : (
              <p>Loading...</p>
            )
          ) : null}

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
    </>
  );
};

export default Workspace;

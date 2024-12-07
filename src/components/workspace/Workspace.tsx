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
  const [tab, setTab] = useState("description");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

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

    fetchProblem();
    fetchTestCase();
  }, [prop.problemId]);

  const mockSubmissions = [
    {
      id: 1,
      status: "ACCEPTED",
      language: "Python",
      result: "12/12",
      notes: "Best solution with O(n) complexity",
      code: `def twoSum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []`,
      testCases: [
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          status: "PASSED",
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          status: "PASSED",
        },
      ],
    },
    {
      id: 2,
      status: "WRONG ANSWER",
      language: "Java",
      result: "10/12",
      notes: "Edge cases failed",
      code: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`,
      testCases: [
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          status: "PASSED",
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          status: "FAILED",
        },
      ],
    },
    {
      id: 3,
      status: "ACCEPTED",
      language: "C++",
      result: "12/12",
      notes: "Optimized solution",
      code: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> num_map;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (num_map.find(complement) != num_map.end()) {\n            return {num_map[complement], i};\n        }\n        num_map[nums[i]] = i;\n    }\n    return {};\n}`,
      testCases: [
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          status: "PASSED",
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          status: "PASSED",
        },
      ],
    },
  ];
  const handleSubmissionClick = (submission) => {
    setSelectedSubmission(submission);
    setTab("submission");
  };

  return (
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
            submissions={mockSubmissions}
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
          <SubmissionDetail
            submission={selectedSubmission}
            testCases={testCases}
          />
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
  );
};

export default Workspace;

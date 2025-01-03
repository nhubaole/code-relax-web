import { useEffect, useState } from "react";
import { SubmissionRes, SubmissionStatisticRes } from "../../models/submission";
import SubmissionService from "../../services/SubmissionService";
import { formatDateTime } from "../../utils/formatter";
import UserService from "../../services/UserService";

const tags = ["Easy", "Medium", "Hard"];

const PracticeHistory = () => {
  const [submissions, setSubmissions] = useState<SubmissionRes[]>([]);
  const [statistic, setstatistic] = useState<SubmissionStatisticRes>();
  useEffect(() => {

    const fetchSubmission = async () => {
      const submissionService = new SubmissionService();
      const user = await UserService.getCurrentUser();

      if (user) {
        const response = await submissionService.getByUserID(user.id);
        const data = response.data;
        setSubmissions(data.data);
      }
    };

    const fetchStatistic = async () => {
      const submissionService = new SubmissionService();
      const user = await UserService.getCurrentUser();

      if (user) {
        const response = await submissionService.getStatisticByUserID(user.id);
        const data = response.data;
        setstatistic(data.data);
      }
    };

    fetchSubmission();
    fetchStatistic();
  }, []);

  if (!submissions || !statistic) return <div>Loading...</div>
  return (
    <div className="px-6  rounded-lg w-full max-w-4xl mx-auto text-white">
      <h3 className="font-semibold text-gray text-lg mb-3">Summary</h3>
      <div className="flex text-gray ">
        <div className="items-center bg-[#ffffff] bg-opacity-10 px-4 py-4 rounded-xl border-l-[6px] border-purple-300 w-full lg:w-[40%] mb-4 lg:mb-0">
          <div className="ml-2">
            <span className="font-bold text-left">Total Solved</span>
            <span className="text-4xl block mt-5">
              {statistic.easyCount + statistic.hardCount + statistic.mediumCount} <span className="text-sm">Problems</span>
            </span>
          </div>
          <div className="flex ml-auto mt-11">
            {tags.map((tag, index) => (
              <div
                key={index}
                className={`flex justify-between mr-2 px-3 w-28 py-1 rounded-full text-xs bg-gray font-semibold `}
              >
                <div
                  className={`${tag === "Easy"
                    ? "text-green-600"
                    : tag === "Medium"
                      ? "text-yellow-500"
                      : "text-red"
                    }`}
                >
                  {tag}
                </div>
                <div className="text-green-700">{tag === "Easy"
                  ? statistic.easyCount
                  : tag === "Medium"
                    ? statistic.mediumCount
                    : statistic.hardCount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between w-full lg:w-[6    0%] space-x-4">
          <div className="flex items-center ml-4 bg-[#ffffff] bg-opacity-10 px-6 py-5 gap-10 rounded-lg border-l-[6px] border-yellow-500">
            <span className="font-bold">Submissions</span>
            <span className="font-semibold text-3xl">{statistic.numOfSubmissions}</span>
          </div>
          <div className="flex items-center bg-[#ffffff] bg-opacity-10 px-6 py-5 gap-10 rounded-lg border-l-[6px] border-green-500">
            <span className="font-bold">Acceptance</span>
            <span className="text-3xl font-semibold">{statistic.acceptanceRate * 100}%</span>
          </div>
        </div>
      </div>

      <div className="mt-14 text-gray">
        <h3 className="font-bold text-lg mb-3">History</h3>
        <div className="overflow-x-auto">
          <div className="bg-[#ffffff] bg-opacity-10 rounded-xl pt-1">
            <div className="flex bg-[#ffffff] bg-opacity-10 px-4 py-2 font-semibold mt-6 rounded-lg mx-5">
              <div className="w-1/4">TIME SUBMITTED</div>
              <div className="w-1/4">PROBLEM</div>
              <div className="w-1/4">STATUS</div>
              <div className="w-1/4">LANGUAGE</div>
            </div>
            {submissions.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center ${entry !== submissions[submissions.length - 1]
                  ? "border-b"
                  : ""
                  }  border-blacklight px-4 mx-5 py-5`}
              >
                <div className="w-1/4">{formatDateTime(entry.createdAt)}</div>
                <div className="w-1/4 text-yellow-300">
                  {entry.problem.title}
                </div>
                <div
                  className={`w-1/4 font-medium ${entry.status === 0 ? "text-green-500" : "text-red"
                    }`}
                >
                  {entry.status === 0 ? "ACCEPTED" : "WRONG ANSWER"}
                </div>
                <div className="w-1/4">{entry.language}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeHistory;

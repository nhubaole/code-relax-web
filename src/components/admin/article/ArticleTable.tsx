import { useEffect, useState } from "react";
import ProblemService from "../../../services/ProblemService";
import { toast } from "react-toastify";
import { formatDateTime } from "../../../utils/formatter";

type Problem = {
  title: string;
  difficulty: number;
  totalTestCase: number;
  tag: string[];
  createdAt: string;
};


const ArticleTable = () => {
  const [problems, setProblems] = useState<Problem[]>([])
  useEffect(()=>{
    const fetchProblems = async () => {
      try{
        const problemService = new ProblemService();

        const response = await problemService.getAll();
        const data = response.data;
        setProblems(data.data);
      }catch (error: any) {
        toast.error(error.message || "Fail to load problems.");
      }

    }
    fetchProblems();
  }
  ,[])
  return (
    <div className="p-4">
      <table className="w-full text-left border-collapse ">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 border-b border-[#A2A1A833]">Title</th>
            <th className="p-3 border-b border-[#A2A1A833]">Difficulty</th>
            <th className="p-3 border-b border-[#A2A1A833]">Tag</th>
            <th className="p-3 border-b border-[#A2A1A833]">Total Test Case</th>
            <th className="p-3 border-b border-[#A2A1A833]">Created Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#A2A1A833]">
          {problems.map((problem, index) => (
            <tr
              key={index}
              className="hover:bg-gray-800 transition-colors duration-200"
            >
              <td className="p-5">{problem.title}</td>
              <td className="p-5 m-5 ">
                <span className={`bg-[#7152F31A] ${problem.difficulty === 0 ? "text-green-500" : problem.difficulty === 1 ? "text-yellow-300" : "text-red"} px-3 py-1 rounded-md`} >{problem.difficulty === 0 ? "Easy" : problem.difficulty === 1 ? "Medium" : "Hard" }</span>
              </td>
              <td className="p-5">{problem.tag.join(", ")}</td>
              <td className="p-5">{problem.totalTestCase}</td>
              <td className="p-5">{formatDateTime(problem.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;

import { useEffect, useState } from "react";
import ProblemService from "../../../services/ProblemService";
import { toast } from "react-toastify";
import { formatDateTime } from "../../../utils/formatter";
import { Dropdown, Menu } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";

type Problem = {
  title: string;
  difficulty: number;
  totalTestCase: number;
  tag: string[];
  createdAt: string;
};


const ProblemTable = () => {
  const [problems, setProblems] = useState<Problem[]>([])
  const token = localStorage.getItem('token');
  useEffect(()=>{
    const fetchProblems = async () => {
      try{
        const problemService = new ProblemService();

        const response = await problemService.getAll(token);
        const data = response.data;
        setProblems(data.data);
      }catch (error: any) {
        toast.error(error.message || "Fail to load problems.");
      }

    }
    fetchProblems();
  }
  ,[])

  const renderActionsMenu = () => (
    <Menu>
      <Menu.Item key="edit" >
        Edit
      </Menu.Item>
      <Menu.Item key="delete" danger>
        Delete
      </Menu.Item>
    </Menu>
  );
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
            <th className="p-3 border-b border-[#A2A1A833]"></th>
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
              <td className="p-5">
                <Dropdown overlay={renderActionsMenu()} trigger={["click"]}>
                  <button className="bg-no-repeat border-none text-white">
                  <BsThreeDotsVertical />
                  </button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;

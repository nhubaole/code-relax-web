import { Pagination } from "antd";
import SearchBar from "../Searchbar";
import ProblemTable from "./ProblemTable";


const AllProblemPage = () => {
  return (
    <div className="h-screen text-[white]">
      <SearchBar />
      <ProblemTable />
      <Pagination  className="text-gray"/>
    </div>
  );
};

export default AllProblemPage;

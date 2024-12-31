import { Pagination } from "antd";
import SearchBar from "../Searchbar";
import ProblemTable from "./ProblemTable";


const AllProblemPage = () => {
  return (
    <div className="h-screen text-[white]">
      <SearchBar />
      <ProblemTable />
      <Pagination className="text-gray" defaultCurrent={1} total={50} onChange={(page) => console.log(page)} />
    </div>
  );
};

export default AllProblemPage;

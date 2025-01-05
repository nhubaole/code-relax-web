import { Pagination } from "antd";
import SearchBar from "../Searchbar";
import ProblemTable from "./ProblemTable";
import { useState } from "react";


const AllProblemPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <div className=" text-[white]">
      <SearchBar onSearch={setSearchKeyword}/>
      <ProblemTable searchKeyword={searchKeyword}/>
      {/* <Pagination className="text-gray" /> */}
    </div>
  );
};

export default AllProblemPage;



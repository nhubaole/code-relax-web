import { Pagination } from "antd";
import SearchBar from "../Searchbar";
import ArticleTable from "./ArticleTable";
import { useState } from "react";


const AllArticlePage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <div className="h-screen text-[white]">
      <SearchBar onSearch={setSearchKeyword}/>
      <ArticleTable searchKeyword={searchKeyword}/>
      {/* <Pagination className="text-gray" /> */}
    </div>
  );
};

export default AllArticlePage
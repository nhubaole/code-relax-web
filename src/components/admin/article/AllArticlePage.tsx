import { Pagination } from "antd";
import SearchBar from "../Searchbar";
import ArticleTable from "./ArticleTable";


const AllArticlePage = () => {
  return (
    <div className="h-screen text-[white]">
      <SearchBar />
      <ArticleTable />
      <Pagination className="text-gray" />
    </div>
  );
};

export default AllArticlePage
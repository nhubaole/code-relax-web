import Pagination from "./Pagination";
import ProblemTable from "./ProblemTable";
import SearchBar from "./Searchbar";


const AllProblemPage = () => {
  return (
    <div className="h-screen text-[white]">
      <SearchBar />
      <ProblemTable />
      <Pagination />
    </div>
  );
};

export default AllProblemPage;

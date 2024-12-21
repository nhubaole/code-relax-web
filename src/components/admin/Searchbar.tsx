
const SearchBar = () => {
  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="text-lg font-semibold">All Problems</div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]"
        />
       
        <button className="hover:bg-gray-600 border border-[#A2A1A833] text-white px-4 py-2 rounded-lg">
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

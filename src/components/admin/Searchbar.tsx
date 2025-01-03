import { useState } from "react";
import { debounce } from "lodash";
type SearchBarProps = {
  onSearch: (keyword: string) => void; // Gửi từ khóa tìm kiếm
};
const SearchBar = ({ onSearch }: SearchBarProps) =>{
  const [value, setValue] = useState("");
  const handleSearch = debounce((searchValue: string) => {
    onSearch(searchValue); // Gửi từ khóa sau khi debounce
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleSearch(newValue);
  };
  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="text-lg font-semibold">All Problems</div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]"
          value={value}
          onChange={onChange}
        />
       
      </div>
    </div>
  );
};

export default SearchBar;

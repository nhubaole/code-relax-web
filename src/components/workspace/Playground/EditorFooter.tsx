import React from "react";

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  return (
    <div className="flex bg-[#1E1E1E] justify-end absolute bottom-0 z-10 w-full">
      <div className="flex justify-end mr-4  items-center space-x-4  rounded-b-lg mb-2 ">
        <button
          className="px-6 h-10 py-1.5  text-center text-sm font-medium items-center bg-[#2A2B2D]  hover:bg-[#1E1E1E] text-gray rounded-[100px]"
          onClick={handleSubmit}
        >
          Run
        </button>
        <button
          className="bg-yellow-300 px-6 h-10 py-1.5  font-medium items-center text-sm text-black rounded-[100px]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default EditorFooter;

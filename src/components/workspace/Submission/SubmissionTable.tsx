
const SubmissionsTable = ({ submissions, onRowClick, onTabChange, tab } :any) => {
  return (
    <div className="w-full text-left text-sm h-screen rounded-lg bg-[#1E1E1E]">
      <div className="flex h-11 w-full bg-blacklight items-center rounded-t-lg pt-2 text-[#FFF]">
        <div
          className={`rounded-t-[5px] px-5 py-[10px]text-base font-bold ${
            tab === "description" ? "text-green-300" : "text-gray"
          } cursor-pointer`}
          onClick={() => onTabChange("description")}
        >
          Description
        </div>

        <div
          className={`rounded-t-[5px] px-5 py-[10px] text-base font-bold ${
            tab === "submission" ? "text-green-300" : "text-gray"
          } cursor-pointer`}
          onClick={() => onTabChange("submission")}
        >
          Submission
        </div>
      </div>
      {/* Table Header */}
      <div className="flex mt-4 text-purple-300 px-4 py-2">
        <div className="flex-1">STATUS</div>
        <div className="flex-1">LANGUAGE</div>
        <div className="flex-1">RESULT</div>
        <div className="flex-1">NOTES</div>
      </div>

      {/* Table Body */}
      <div className="px-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="flex items-center cursor-pointer text-gray py-4 px-2 hover:bg-blacklight border-b border-blacklight rounded-lg"
            onClick={() => onRowClick(sub)}
          >
            {/* Status */}
            <div
              className={`flex-1 font-[550] ${
                sub.status === "ACCEPTED" ? "text-green-500" : "text-red"
              }`}
            >
              {sub.status}
            </div>
            {/* Language */}
            <div className="flex-1">{sub.language}</div>
            {/* Result */}
            <div className="flex-1">
              {sub.result}
              <div className="text-[#FFF]/30 text-xs">test cases passed</div>
            </div>
            {/* Notes */}
            <div className="flex-1">{sub.notes || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsTable;

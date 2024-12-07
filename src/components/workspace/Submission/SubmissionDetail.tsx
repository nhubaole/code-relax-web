
const SubmissionDetail = ({ submission, testCases }: any) => {
 
  if (!submission) return <p>Select a submission to view details.</p>;
  return (
    <div>
      <div className="flex h-11 w-full bg-blacklight items-center rounded-t-lg pt-2 text-[#FFF]">
        <div
          className={
            " rounded-t-[5px] px-5 py-[10px] text-base font-bold text-green-300 cursor-pointer"
          }
        >
          Submission Detail
        </div>
      </div>

        <div>
          <h2 className="text-lg text-red">{submission.status}</h2>
          <pre className="bg-gray-800 text-gray p-4 rounded">{submission.code}</pre>
        </div>
        

    </div>
  );
};

export default SubmissionDetail;

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { SubmissionRes } from "../../../models/submission";
import { formatDateTime } from "../../../utils/formatter";

interface SubmissionDetailProps {
  submission: SubmissionRes | undefined;
}

const SubmissionDetail = (prop: SubmissionDetailProps) => {
  let languageMode = cpp();
  if (prop.submission) {
    switch (prop.submission.language) {
      case "Python":
        languageMode = python();
        break;
      case "Java":
        languageMode = java();
        break;
      case "C++":
      default:
        languageMode = cpp();
    }
  }

  if (!prop.submission)
    return <p className="text-gray">Select a submission to view details.</p>;

  const formattedCode = prop.submission.code.replace(/\\n/g, "\n");
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
        <div className="flex justify-between items-center border-b border-[#2A2B2D]  p-4">
          <div>
            <h2
              className={`text-lg font-semibold ${
                prop.submission.status == 1 ? "text-green-300" : "text-red"
              } `}
            >
              {prop.submission.status == 1 ? "ACCEPTED" : "WRONG ANSWER"}
            </h2>
            <p className="text-xs text-gray">submitted at {formatDateTime(prop.submission.createdAt)}</p>
          </div>
          <h2 className="text-gray">
            {prop.submission.result} <span className="text-sm">test case passed</span>
          </h2>
        </div>

        <div className="flex items-center my-4 ml-5 space-x-6">
          <h1 className="text-gray font-semibold">Code</h1>
          <div className="text-[#2A2B2D]">|</div>
          <p className="text-yellow-500">{prop.submission.language}</p>
        </div>
        <div className="w-full overflow-auto  bg-[#1E1E1E] rounded-xl p-4">
          <CodeMirror
            value={formattedCode}
            theme={vscodeDark}
            extensions={[languageMode]}
            readOnly={true}
            editable={false}
          />
        </div>

        <div className="my-4 ml-5">
          <h1 className="text-gray font-semibold">Notes</h1>
        </div>
        <div className="w-full overflow-auto  bg-[#1E1E1E] rounded-xl p-4">
          <textarea
            placeholder="Some thing for your solution"
            style={{
              backgroundColor: "inherit",
              color: "#FFFFFF",
              border: "none",
              outline: "none",
            }}
            className="text-gray w-full"
            name=""
            id=""
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;

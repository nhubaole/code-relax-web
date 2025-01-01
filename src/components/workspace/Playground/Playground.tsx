import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import EditorFooter from "./EditorFooter";
import { autocompletion } from "@codemirror/autocomplete";
import { ProblemRes, SubmitReq, TestCase } from "../../../models/problem";
import { testCaseFormatter } from "../../../utils/formatter";
import { generateInitialCode } from "../../../utils/helper";
import ProblemService from "../../../services/ProblemService";
import { toast } from "react-toastify";
import { Spin } from "antd";
import SubmissionService from "../../../services/SubmissionService";
import UserService from "../../../services/UserService";


type PlaygroundProps = {
  problem: ProblemRes;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
  testCases: TestCase[];
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground = (prop: PlaygroundProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(
    prop.testCases[0].id
  );

  const [isLoading, setIsLoading] = useState(false);
  const [fontSize] = useLocalStorage("lcc-fontSize", "14px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [userCode, setUserCode] = useState<string>("");
  const testCasesRes = testCaseFormatter(prop.testCases);
  const activeTestCase = testCasesRes.find(
    (testCase) => testCase.id === activeTestCaseId
  );
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (prop.problem) {
      const initialCode = generateInitialCode(
        prop.problem.functionName,
        prop.problem.returnType,
        selectedLanguage
      );
      setUserCode(initialCode);
    }
  }, [selectedLanguage, prop.problem]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${1}`, JSON.stringify(value));
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  let languageMode;
  switch (selectedLanguage) {
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
  const handleSubmit = async () => {
    const problemService = new ProblemService();
    const submission = new SubmissionService();

    const req: SubmitReq = {
      problemID: prop.problem.id,
      sourceCode: userCode,
      language: selectedLanguage,
    };
    setIsLoading(true);
    try {
      const response = await problemService.submit(req, token);
      const data = response.data;
      var submissionStatus = 0

      console.log(data.statusCode);

      if (data.statusCode === 0) {
        submissionStatus = 1
        toast.success("Congratulation, all testcases passed!");
      } else {
        toast.error(data.message);
      }

      try {
        const user = await UserService.getCurrentUser();
        if (user) {
          await submission.createSubmission(prop.problem.id, user.id, userCode, selectedLanguage, submissionStatus, data.data.output)
        }
      } catch (error) {
        console.error("Error fetching getCurrentUser:", error);
      }
    } catch (error: any) {
      toast.error(error.message || "Fail to run code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunCode = async () => {
    const problemService = new ProblemService();
    const req: SubmitReq = {
      problemID: prop.problem.id,
      sourceCode: userCode,
      language: selectedLanguage,
    };
    setIsLoading(true);
    try {
      const response = await problemService.runCode(req, token);
      const data = response.data;
      console.log(data.statusCode);

      if (data.statusCode === 0) {
        toast.success("Congratulation, all testcases passed!");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Fail to run code.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large"></Spin>
      </div>
    );
  }
  return (
    <div className="flex flex-col rounded-lg relative">
      <div className="flex h-11 w-full bg-blacklight items-center rounded-t-lg pt-2 text-[#FFF]">
        <div
          className={
            " rounded-t-[5px] px-5 py-[10px] text-base font-bold text-green-300 cursor-pointer"
          }
        >
          Code
        </div>
      </div>
      <PreferenceNav
        settings={settings}
        setSettings={setSettings}
        onLanguageChange={handleLanguageChange}
      />

      <Split
        className="h-[calc(100vh-120px)] border-t border-blacklight split"
        direction="vertical"
        sizes={[50, 44]}
        minSize={60}
        gutterSize={10}
        cursor="row-resize"
      >
        <div className="w-full overflow-auto  bg-[#1E1E1E]">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[languageMode, autocompletion()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>

        <div className="w-full overflow-auto bg-[#1E1E1E]">
          <div className="flex h-10 items-center rounded-t-lg space-x-6 bg-blacklight">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-base p-3 font-bold leading-5 text-green-300">
                Testcases
              </div>
            </div>
          </div>

          <div className="flex p-3 border-b border-blacklight">
            {testCasesRes.map((value, index) => (
              <div
                className={"mr-2 items-start mt-2 "}
                key={index}
                onClick={() => {
                  setActiveTestCaseId(value.id);
                }}
              >
                <div className="flex flex-wrap items-center gap-y-4 ">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                      ${
                        activeTestCaseId === value.id
                        ? "text-black bg-[#FFF]"
                        : "text-gray bg-blacklight"
                      }
                    `}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-4 px-4">
            <p className="text-sm font-medium mt-4 text-gray">Input = </p>
            <div className=" cursor-text font-medium rounded-lg px-3 py-[10px] bg-blacklight text-gray mt-2">
              {activeTestCase?.input}
            </div>
            <p className="text-sm font-medium mt-4 text-gray">Output:</p>
            <div className="w-auto cursor-text rounded-lg px-3 py-[10px] bg-blacklight text-gray mt-2">
              {activeTestCase?.output}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} handleRunCode={handleRunCode} />
    </div>
  );
};
export default Playground;

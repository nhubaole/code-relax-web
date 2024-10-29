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
import { autocompletion } from '@codemirror/autocomplete';

type PlaygroundProps = {
  problem: any;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground = (prop: PlaygroundProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [problemDetail, setProblem] = useState<ProblemDetail | null>(null);

  const [user, setUser] = useState<any>();
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "14px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [userCode, setUserCode] = useState<string>("");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5107/api/Problems/GetProblemDetail?problemId=1}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json, text/plain",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        const data = await response.json();
        setProblem(data.data);
      } catch (error) {}
    };

    fetchProblemDetails();
  }, []);
  let initialCode;

  useEffect(() => {
    if (problemDetail) {
      if (problemDetail.returnType == "int") {
        switch (selectedLanguage) {
          case "Python":
            initialCode = `def ${problemDetail.functionName}():`;
            break;
          case "Java":
            initialCode = `public static int ${problemDetail.functionName}() {}`;
            break;
          case "C++":
          default:
            initialCode = `int ${problemDetail.functionName}() {}`;
        }
        setUserCode(initialCode);
      } else if (problemDetail.returnType == "string") {
        switch (selectedLanguage) {
          case "Python":
            initialCode = `def ${problemDetail.functionName}():`;
            break;
          case "Java":
            initialCode = `public static String ${problemDetail.functionName}() {}`;
            break;
          case "C++":
          default:
            initialCode = `string ${problemDetail.functionName}() {}`;
        }
        setUserCode(initialCode);
      }
    }
  }, [selectedLanguage, problemDetail]);
  const API_URL = "http://localhost:5107/api/Judge/Submit";
  const CREATE_API_URL = "http://localhost:5107/api/Submissions";

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
  const [res, setRes] = useState();
  const handleSubmit = async () => {
    if (!user) {
      console.log("errr");
    }
    try {
      const data = {
        problemId: prop.problem.problemId,
        sourceCode: userCode,
        language: selectedLanguage,
      };
      var casesPass = 1;
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!res.ok) {
      }
      const result = await res.json();

      if (result.statusCode == 200) {
        setRes(result.data.output);
        const createData = {
          problemId: prop.problem.problemId,
          language: selectedLanguage,
          isAccepted: true,
          numCasesPassed: problemDetail?.testCases.length,
        };
        await fetch(CREATE_API_URL, {
          method: "POST",
          body: JSON.stringify(createData),
          mode: "cors",
          headers: {
            Authorization: `Bearer ${casesPass}`,
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json, text/plain",
          },
        });
      } else if (result.statusCode == 204) {
        setRes(result.data.output);
        const createData = {
          problemId: prop.problem.problemId,
          language: selectedLanguage,
          isAccepted: false,
          numCasesPassed: Number(problemDetail?.testCases.length) - 1,
        };
        await fetch(CREATE_API_URL, {
          method: "POST",
          body: JSON.stringify(createData),
          mode: "cors",
          headers: {
            Authorization: `Bearer ${createData}`,
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
      } else if (result.statusCode == 400) {
        setRes(result.data.output);
      } else if (result.statusCode == 500) {
      }
    } catch (error: any) {}
  };
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
            {[1, 2, 3].map((index) => (
              <div
                className={"mr-2 items-start mt-2 "}
                key={String(index)}
                onClick={() => {
                  if (index == 0) setActiveTestCaseId(index);
                }}
              >
                <div className="flex flex-wrap items-center gap-y-4 ">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                      ${
                        1 === index
                          ? "text-black bg-[#FFF]"
                          : "text-gray bg-blacklight"
                      }
                    `}
                  >
                    Case {index}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-4 px-4">
            <p className="text-sm font-medium mt-4 text-gray">
              Input = {" "}
            </p>
            <div className=" cursor-text font-medium rounded-lg px-3 py-[10px] bg-blacklight text-gray mt-2">
              nums = [1,2,3,4], target = 9
            </div>
            <p className="text-sm font-medium mt-4 text-gray">Output:</p>
            <div className="w-auto cursor-text rounded-lg px-3 py-[10px] bg-blacklight text-gray mt-2">
              [2, 7, 11, 25]
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit}/>
    </div>
  );
};
export default Playground;

import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";

type WorkspaceProps = {
  problem: any;
};

const Workspace = (prop: WorkspaceProps) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <Split
      className="flex bg-[#151617] p-4 split overflow-hidden h-screen"
      direction="horizontal" 
      gutterSize={10}
      minSize={0}
      gutterAlign="center"
      
    >
      <ProblemDescription />
      <div className="">
        <Playground
          problem={prop.problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};
export default Workspace;

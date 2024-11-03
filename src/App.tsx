import Workspace from "./components/workspace/Workspace";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "./context/LoaderContext";

function App() {
  return (
    <LoaderProvider>
      <Workspace problem={undefined} />
      <ToastContainer />
    </LoaderProvider>
  );
}

export default App;

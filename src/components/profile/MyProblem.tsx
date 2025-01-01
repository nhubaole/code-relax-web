import { useState } from "react";
import { Input, Modal, Select } from "antd";

const tags = ["Easy", "Medium", "Hard"];

const MyProblem = () => {

    const [submissions, setSubmissions] = useState([
        { title: "aaaaa", explain: "aaaa" },
      ]);
  const { Option } = Select;
  const tags = ["Easy", "Medium", "Hard"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: "",
    explain: "",
    tag: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewProblem({ title: "", explain: "", tag: "" });
  };
  const handleCreate = () => {
    if (newProblem.title && newProblem.explain && newProblem.tag) {
      setSubmissions([...submissions, newProblem]);
      handleCancel(); // Đóng modal sau khi thêm mới
    } else {
      alert("Please fill in all fields!");
    }
  };
  return (
    <div className="px-6  rounded-lg w-full max-w-4xl mx-auto text-white">


      <div className="mt-14 text-gray">
        <div className="flex  justify-between items-center ">
            <h3 className="font-bold text-lg mb-3">My Problems</h3>
            <button onClick={showModal} className="bg-green-500 font-bold text-[#fff] p-3 mb-5 text-sm rounded-lg">Create Problem</button>
        </div>
        <div className="overflow-x-auto">
          <div className="bg-[#ffffff] bg-opacity-10 rounded-xl pt-1">
            <div className="flex bg-[#ffffff] bg-opacity-10 px-4 py-2 font-semibold mt-6 rounded-lg mx-5">
              <div className="w-1/4">TITLE</div>
              <div className="w-1/4">DIFFICULT</div>
              <div className="w-1/4">TAG</div>
              <div className="w-1/4">EXPLAIN</div>
              <div className="w-1/4">CREATED TIME</div>
            </div>
            {submissions.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  entry !== submissions[submissions.length - 1]
                    ? "border-b"
                    : ""
                }  border-blacklight px-4 mx-5 py-5`}
              >
                <div className="w-1/4"> AAAA</div>
                <div className="w-1/4 text-yellow-300">
                  {entry.title}
                </div>
                <div className="w-1/4 text-yellow-300">
                  {entry.title}
                </div>
                <div className="w-1/4 text-yellow-300">
                  {entry.title}
                </div>
                
               
                <div className="w-1/4">{entry.explain}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
       {/* Modal */}
       <Modal
        className="custom-modal"
        title="Create New Problem"
        open={isModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <label className="block mb-2 font-bold">Title</label>
          <Input
            value={newProblem.title}
            onChange={(e) =>
              setNewProblem({ ...newProblem, title: e.target.value })
            }
            placeholder="Enter problem title"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Difficulty</label>
          <Select
            value={newProblem.tag}
            onChange={(value) => setNewProblem({ ...newProblem, tag: value })}
            placeholder="Select a tag"
            className="w-full"
          >
            {tags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Explain</label>
          <Input.TextArea
            value={newProblem.explain}
            onChange={(e) =>
              setNewProblem({ ...newProblem, explain: e.target.value })
            }
            placeholder="Enter explanation"
          />
        </div>
      </Modal>
    </div>
  );
};

export default MyProblem;

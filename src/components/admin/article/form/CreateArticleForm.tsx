import React, { useState } from "react";
import { Input, Button, Modal, Radio, Upload } from "antd";


const CreateArticleForm: React.FC = () => {
  const [testCases, setTestCases] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentParams, setCurrentParams] = useState<{ [key: string]: string | number }>({});
  const [testCaseFields, setTestCaseFields] = useState<string[]>([]);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});




  const addField = () => {
    setTestCaseFields([...testCaseFields, `Param ${testCaseFields.length + 1}`]);
  };
  const removeField = (index: number) => {
    // Xóa tham số tại vị trí `index`
    const updatedFields = testCaseFields.filter((_, idx) => idx !== index);
    setTestCaseFields(updatedFields);

    // Cập nhật currentParams nếu đã thêm giá trị
    const updatedParams = { ...currentParams };
    delete updatedParams[`Param ${index + 1}`];
    setCurrentParams(updatedParams);
  };
  const handleVariableNameChange = (index: number, value: string) => {
    const updatedFieldValues = { ...fieldValues, [`Param ${index + 1}`]: value };
    setFieldValues(updatedFieldValues);
  };

  const [questions, setQuestions] = useState<any[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        explanation: "",
        options: ["", "", "", ""],
        correctOption: null,
      },
    ]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleExplanationChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].explanation = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (qIndex: number, value: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctOption = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  

  return (
    <div className="bg-dark-500 p-8 rounded-lg w-full max-w-4xl mx-auto text-[white]">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-xl font-semibold">New Article</h2>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-7 text-[#A2A1A8CC]">
          <input  type="text" placeholder="Title" className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none" />
          <input  type="text" placeholder="Summary" className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]  focus:outline-none" />
          <Upload.Dragger
                     
                      className="border-dashed ant-upload-drag"
                    >
                     
                      <p className="text-[white] text-xs">
                        Bấm hoặc kéo thả hình ảnh vào đây để <br /> tải ảnh lên!
                      </p>
                    </Upload.Dragger>
    
        </div>


           <div className="mt-8 w-full">
          <h3 className="text-lg mb-4">Content</h3>
          <div className="flex space-x-6 mb-4">
            <Button onClick={addField} className="bg-[#7152F3] text-[white] border-none">
              Add part
            </Button>
          
          </div>
          <div className="flex flex-col space-y-5 p-4">
            {testCaseFields.map((field, index) => (
             <div className="flex space-x-4 items-center">
              <p>Part {index + 1}</p>
               <input
                key={index}
                type="text"
                placeholder={`Subtitle`}
                onChange={(e) => handleVariableNameChange(index, e.target.value)}
                className="p-2 w-[40%] rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                
              />
              <input
                key={index}
                type="text"
                placeholder={`Content`}
                onChange={(e) => handleVariableNameChange(index, e.target.value)}
                className="p-2 w-[40%] rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"/>
              <button onClick={()=>removeField(index)}>x</button>
             </div>
            ))}
          </div>
        </div>
         {/* Questions Section */}
         <div className="mt-8">
          <h3 className="text-lg mb-4 w-full">Quizzes</h3>
          <Button
            onClick={addQuestion}
            className="bg-[#7152F3] text-[white] border-none mb-4"
          >
            + Add question
          </Button>
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="p-4 bg-[#16151C] rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-[#A2A1A8]">Question {qIndex + 1}</h4>
                  <Button
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 border-none"
                  >
                    Remove
                  </Button>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex flex-col w-1/2">
                        <input
                        placeholder="Question"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="mt-4 p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                        />
                        <textarea
                        placeholder="Explanation"
                        value={question.explanation}
                        onChange={(e) =>
                            handleExplanationChange(qIndex, e.target.value)
                        }
                        className="mt-6 p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                        rows={5}
                        />
                    </div>
                    <div className="mt-3 w-1/2">
                    {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-y-4 space-x-2">
                        <Radio
                            checked={question.correctOption === oIndex}
                            onChange={() =>
                            handleCorrectOptionChange(qIndex, oIndex)
                            }
                        />
                        <input
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            value={option}
                            onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            className="p-2 w-full rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                        />
                        </div>
                    ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button className="border border-[#A2A1A833] text-[white] bg-[#16151C]">
            Cancel
          </Button>
          <Button className="text-[white] bg-[#7152F3] border-none">
            Next
          </Button>
        </div>
      </form>
      
    </div>
  );
};

export default CreateArticleForm;

import React, { useState } from "react";
import { Input, DatePicker, Select, Button, SelectProps, Modal } from "antd";

const { Option } = Select;
const options: SelectProps['options'] = [
    { value: 'Array' },
    { value: 'Hash Map' },
    { value: 'String' },
    { value: 'Dynamic Programming' },
  ];

const CreateProblemForm: React.FC = () => {
  const [testCases, setTestCases] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentParams, setCurrentParams] = useState<{ [key: string]: string | number }>({});
  const [testCaseFields, setTestCaseFields] = useState<string[]>([]);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

  const handleAddValue = () => {
    setShowModal(true);
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, currentParams]);
    setCurrentParams({});
    setShowModal(false);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setCurrentParams({ ...currentParams, [field]: value });
  };

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

  const removeTestCase = (index: number) => {
    const updatedTestCases = testCases.filter((_, idx) => idx !== index);
    setTestCases(updatedTestCases);
  };
  return (
    <div className="bg-dark-500 p-8 rounded-lg w-full max-w-4xl mx-auto text-[white]">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-xl font-semibold">New Problem</h2>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-7 text-[#A2A1A8CC]">
          <input  type="text" placeholder="Title" className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none" />
          <input  type="text" placeholder="Explaination" className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]  focus:outline-none" />
          <input  type="text" placeholder="Function Name" className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]  focus:outline-none" />
          <Select
            placeholder="Return Type"
            size="large"
            className="w-full custom-dropdown custom-select"
          >
                <Option className="rounded-lg" value="string">String</Option>
                <Option  className="rounded-lg" value="int">Int</Option>
                <Option  className="rounded-lg"  value="bool">Boolean</Option>
                <Option  className="rounded-lg"  value="list<string>">{'List<String>'}</Option>
                <Option  className="rounded-lg"  value="list<int>">{'List<Int>'}</Option>
          </Select>
        
          <Select
            placeholder="Difficulty"
            size="large"
            className="w-full custom-dropdown custom-select"
          >
                <Option className="rounded-lg" value="1">Easy</Option>
                <Option  className="rounded-lg" value="2">Medium</Option>
                <Option  className="rounded-lg"  value="3">Hard</Option>
          </Select>
          <Select
            placeholder="Tag"
            mode="multiple"
            size="large"
            className="w-full custom-dropdown custom-select"
            options={options}
          >
          </Select>
          
        </div>


          <div className="flex">
           <div className="mt-8 border-r border-[#A2A1A8] pr-24">
          <h3 className="text-lg mb-4">Testcase Definition</h3>
          <div className="flex space-x-6 mb-4">
            <Button onClick={addField} className="bg-[#7152F3] text-[white] border-none">
              Add New Param
            </Button>
            <Button onClick={handleAddValue} className=" bg-[#16151C] text-[white] border px-10 border-[#A2A1A833]">
              Add Value
            </Button>
          </div>
          <div className="flex flex-col space-y-5">
            {testCaseFields.map((field, index) => (
             <div className="flex space-x-4 items-center">
              <p>Param {index + 1}</p>
               <input
                key={index}
                type="text"
                placeholder={`Variable name`}
                onChange={(e) => handleVariableNameChange(index, e.target.value)}
                className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
              />
              <button onClick={()=>removeField(index)}>x</button>
             </div>
            ))}
          </div>
        </div>

        {/* Render Testcases */}
        <div className="mt-8 ml-5">
          <div className="space-y-4">
            {testCases.map((testCase, index) => (
              <div
                key={index}
                className="p-4 bg-[#16151C] rounded-lg flex space-x-14 items-center text-center"
              >
                <div className="flex flex-col">
                  <h1 className="text-[#A2A1A8]">No.</h1>
                  <p>{index+1}</p>
                </div>
                {testCaseFields.map((field) => (
                  
                  <p className="flex flex-col" key={field}>
                    

                    <strong className="text-[#A2A1A8]">{fieldValues[field] || field} </strong>
                    {testCase[field]}
                  </p>
                ))}
                <button onClick={()=>removeTestCase(index)}>x</button>
              </div>
            ))}
          </div>
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
      <Modal
       styles={{
        content: { backgroundColor: '#16151C' }, 
      }}
        title="Add Value"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleAddTestCase}
        className="custom-modal"
      >
        {testCaseFields.map((field, index) => (
          <div key={index} className="mb-4">
            <Input
              placeholder={fieldValues[field] || field}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className="p-2 rounded-lg bg-[#16151C] text-white"
            />
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default CreateProblemForm;

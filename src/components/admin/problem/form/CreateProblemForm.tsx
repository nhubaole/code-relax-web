import React from "react";
import { Input, DatePicker, Select, Button, SelectProps } from "antd";

const { Option } = Select;
const options: SelectProps['options'] = [
    { value: 'Array' },
    { value: 'Hash Map' },
    { value: 'String' },
    { value: 'Dynamic Programming' },
  ];

const CreateProblemForm: React.FC = () => {
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

export default CreateProblemForm;

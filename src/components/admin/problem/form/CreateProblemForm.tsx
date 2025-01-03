import React, { useEffect, useState } from "react";
import { Input, DatePicker, Select, Button, SelectProps, Modal } from "antd";
import { TagRes } from "../../../../models/tag";
import TagService from "../../../../services/TagService";
import { toast } from "react-toastify";
import ProblemService from "../../../../services/ProblemService";
import { CreateProblemReq } from "../../../../models/problem";
import { useCookies } from "react-cookie";

const { Option } = Select;


const CreateProblemForm: React.FC = () => {
  const [testCases, setTestCases] = useState<any[]>([]);
  const [tags, setTags] = useState<TagRes[]>([])
  const [showModal, setShowModal] = useState(false);
  const [currentParams, setCurrentParams] = useState<{ [key: string]: string | number }>({});
  const [testCaseFields, setTestCaseFields] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [isAddingValue, setIsAddingValue] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [explaination, setExplaination] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number | undefined>(undefined);
  const [functionName, setFunctionName] = useState<string>("");
  const [returnType, setReturnType] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputJson, setInputJson] = useState<string[]>([]);
  const [outputJson, setOutputJson] = useState<string[]>([]); 
  const [cookie] = useCookies(["token"]);
  const token = cookie.token

  
  const handlePrepareInputJson = () => {
    const variableNames = Object.values(fieldValues); // Extract variable names (e.g., ['nums', 'target'])
  
    const preparedInputJson = testCases.map((testCase) => {
      // Construct the JSON object for each test case
      const input = variableNames.reduce((acc, variableName, idx) => {
        let value = testCase[`Param ${idx + 1}`]; // Get the raw input value
  
        // Parse value dynamically
        try {
          if (typeof value === "string") {
            // Attempt to parse JSON for arrays or objects
            const parsedValue = JSON.parse(value);
            value = parsedValue;
          } else if (!isNaN(value)) {
            value = Number(value); // Convert to number if numeric
          } else {
            value = String(value); // Otherwise, treat as string
          }
        } catch {
          // If parsing fails, treat as string
          value = String(value);
        }
  
        acc[variableName] = value; // Map the value to the variable name
        return acc;
      }, {});
  
      // Convert to a properly formatted JSON string
      return JSON.stringify(input);
    });
  
    // Set formatted JSON strings in inputJson state
    console.log("Prepared Input JSON:", preparedInputJson);
    return preparedInputJson
  };
  
  

  const handleSubmit = async () => {
    
    const input = handlePrepareInputJson();
    const problemData: CreateProblemReq = {
      title: title,
      explaination: explaination,
      difficulty: difficulty || 0, // Ensure default value if not selected
      functionName: functionName,
      returnType: returnType,
      tags: selectedTags, // Assuming you select tags
      input: input,
      output: outputJson,
    };
    console.log("problem",problemData);
  
    const problemService = new ProblemService();
    try {
      await problemService.createProblem(problemData, token);
      toast.success("Problem created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create problem.");
    }
  };

  useEffect(() => {
      fetchAllTag();
  },[]);

  const fetchAllTag = async () => {
    const tagService = new TagService();
    try {
      const response = await tagService.getAll();
      setTags(response.data.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      
    }
  };
  const options: SelectProps['options'] = tags.map(tag => ({
    value: tag.name, 
  }));

  const handleAddValue = () => {
    resetModalState(); // Đảm bảo trạng thái được xóa
    setIsAddingValue(true); // Kích hoạt trạng thái "đang thêm giá trị"
    setShowModal(true); // Hiển thị modal
  };

  
  const resetModalState = () => {
    setCurrentParams({});
    setOutput([]); // Reset output
  };
  

  const handleAddTestCase = () => {
    // Create a new test case with current parameters
    const newTestCase = { ...currentParams };
  
    // Add the test case to the list
    setTestCases([...testCases, newTestCase]);
  
    // Parse the output
    const transformedOutput = output.map((value) => {
      if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch {
          console.error("Failed to parse value:", value);
        }
      }
  
      switch (returnType) {
        case "string":
          return `{"output": "${value}"}`;
        case "int":
          return `{"output": ${parseInt(value, 10)}}`;
        case "bool":
          return `{"output": ${value === "true"}}`;
        case "list<string>":
          if (Array.isArray(value)) {
            return `{"output": [${value.map((item) => `"${item}"`).join(", ")}]}`;
          } else {
            return `{"output": [${value.split(",").map((item) => `"${item.trim()}"`).join(", ")}]}`;
          }
        case "list<int>":
          if (Array.isArray(value)) {
            return `{"output": [${value.join(", ")}]}`;
          } else {
            return `{"output": [${value.split(",").map((item) => parseInt(item.trim(), 10)).join(", ")}]}`;
          }
        default:
          throw new Error("Invalid return type");
      }
    });
  
    // Add the transformed output to the JSON array
    setOutputJson([...outputJson, ...transformedOutput]);
  
    // Reset current parameters and hide modal
    setCurrentParams({});
    setOutput([]);
    setShowModal(false);
  };
  


  const handleFieldChange = (field: string, value: string | number) => {
    if (field === "Output") {
      setOutput([ value as string]); // Add new value to output array
    } else {
      setCurrentParams({ ...currentParams, [field]: value });
    }
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
    const updatedOutput = output.filter((_, idx) => idx !== index);
    setOutput(updatedOutput);
  };
  return (
    <div className="bg-dark-500 p-8 rounded-lg w-full max-w-4xl mx-auto text-[white]">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-xl font-semibold">New Problem</h2>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-7 text-[#A2A1A8CC]">
          <input  type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none" />
          <input  type="text" placeholder="Explaination" value={explaination}
      onChange={(e) => setExplaination(e.target.value)}  className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]  focus:outline-none" />
          <input  type="text" placeholder="Function Name" value={functionName}
      onChange={(e) => setFunctionName(e.target.value)} className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]  focus:outline-none" />
          <Select
            placeholder="Return Type"
            size="large"
            onChange={(value) => setReturnType(value)}
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
            onChange={(value)=>setDifficulty(value)}
            size="large"
            className="w-full custom-dropdown custom-select"
          >
                <Option className="rounded-lg" value="0">Easy</Option>
                <Option  className="rounded-lg" value="1">Medium</Option>
                <Option  className="rounded-lg"  value="2">Hard</Option>
          </Select>
          <Select
            placeholder="Tag"
            mode="multiple"
            size="large"
            className="w-full custom-dropdown custom-select"
            options={options}
            value={selectedTags} 
            onChange={(values) => setSelectedTags(values)}
          >
          </Select>
          
        </div>


          <div className="flex">
           <div className="mt-8 border-r border-[#A2A1A8] pr-24">
          <h3 className="text-lg mb-4">Testcase Definition</h3>
          <div className="flex space-x-6 mb-4">
            <Button disabled={isAddingValue}  onClick={addField}  className={`bg-[#7152F3] text-[white] border-none ${
          isAddingValue ? "disabled-btn" : ""
        }`}>
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
            {testCases.map((testCase, index) => {
              const parsedOutput = JSON.parse(outputJson[index]);
              return (<div
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
                 <div className="flex flex-col">
                  <h1 className="text-[#A2A1A8]">Output</h1>
                  <p>{JSON.stringify(parsedOutput.output)}</p>
                </div>
                <button onClick={()=>removeTestCase(index)}>x</button>
              </div>
            )})}
          </div>
        </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <Button className="border border-[#A2A1A833] text-[white] bg-[#16151C]">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="text-[white] bg-[#7152F3] border-none">
            Create
          </Button>
        </div>
      </form>
      <Modal
       styles={{
        content: { backgroundColor: '#16151C' }, 
      }}
        title="Add Value"
        open={showModal}
        onCancel={() => {
          resetModalState(); // Xóa giá trị
          setShowModal(false); 
        }}
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
         <Input
              placeholder="Output"
              onChange={(e) => handleFieldChange("Output", e.target.value)}
              className="p-2 rounded-lg bg-[#16151C] text-white"
            />
      </Modal>
    </div>
  );
};

export default CreateProblemForm;

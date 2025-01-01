import React, { useState } from "react";
import { Button, Radio, Upload } from "antd";
import ArticleService from "../../../../services/ArticleService";
import { toast } from "react-toastify";


const CreateArticleForm: React.FC = () => {
  const [inputFields, setInputFields] = useState<string[]>([]); // Thay vì testCaseFields
  const [fieldData, setFieldData] = useState<{ [key: string]: string }>({}); // Thay vì fieldValues
  const [coverImageList, setCoverImageList] = useState<any[]>([]); // Thay vì fileList
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]); // Thay vì questions
  const [title, setTitle] = useState<string>("")
  const [summary, setSummary] = useState<string>("")
  const token = localStorage.getItem("token");
  console.log(inputFields)
  console.log(quizQuestions)  
  console.log(fieldData)

  const handleCreateArticle = async () => {
    const articleService = new ArticleService();
    try {
      const formData = new FormData();

      const subtitles = inputFields.map((_, index) => fieldData[`Subtitle ${index + 1}`]);
      const contents = inputFields.map((_, index) => fieldData[`Content ${index + 1}`]);

      formData.append("Title", title); // Thay bằng giá trị từ input nếu cần
      formData.append("Summary", summary); // Thay bằng giá trị từ input nếu cần
      subtitles.forEach((subtitle) => {
        formData.append(`SubTitle`, subtitle); // Thêm từng subtitle vào FormData
      });
      
      // Lặp qua các phần tử của `contents`
      contents.forEach((content) => {
        formData.append(`Content`, content); // Thêm từng content vào FormData
      });

      coverImageList.forEach((file) => {
        formData.append("Cover", file.originFileObj);
      });

      const res = await articleService.create(formData, token);
      const articleId = res.data.data;
      for (const question of quizQuestions) {
        const quizData = {
          questionText: question.question,            // Câu hỏi
          optionA: question.options[0] || "",         // Đáp án A
          optionB: question.options[1] || "",         // Đáp án B
          optionC: question.options[2] || "",         // Đáp án C
          optionD: question.options[3] || "",         // Đáp án D
          correctOption: question.correctOption === 0 ? "A" : question.correctOption === 1 ? "B" : question.correctOption === 2 ? "C" : "D",
          explanation: question.explanation,          // Giải thích
          articleId: articleId,                       // ID bài viết
        };

        console.log(quizData)
        await articleService.createQuiz(quizData, token!);
      }
      toast.success("Article created successfully!");
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article. Please try again.");
    }
  };

  const addInputField = () => {
    setInputFields([...inputFields, `Field ${inputFields.length + 1}`]);
  };

  const removeInputField = (index: number) => {
    const updatedFields = inputFields.filter((_, idx) => idx !== index);
    setInputFields(updatedFields);

    // Cập nhật fieldData nếu đã thêm giá trị
    const updatedFieldData = { ...fieldData };
    delete updatedFieldData[`Subtitle ${index + 1}`];
    delete updatedFieldData[`Content ${index + 1}`];
    setFieldData(updatedFieldData);
  };

  const handleFieldChange = (index: number, fieldType: "Subtitle" | "Content", value: string) => {
    setFieldData({
      ...fieldData,
      [`${fieldType} ${index + 1}`]: value,
    });
  };

  const addQuizQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        questionText: "",
        explanation: "",
        options:["", "","",""],
        correctOption: null,
        articleId: 0
      },
    ]);
  };

  const removeQuizQuestion = (index: number) => {
    const updatedQuestions = quizQuestions.filter((_, qIndex) => qIndex !== index);
    setQuizQuestions(updatedQuestions);
  };

  const updateQuizQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index][field] = value;
    setQuizQuestions(updatedQuestions);
  };

  const updateQuizOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizQuestions(updatedQuestions);
  };

  const updateCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].correctOption = optionIndex;
    setQuizQuestions(updatedQuestions);
  };
  

  return (
    <div className="bg-dark-500 p-8 rounded-lg w-full max-w-4xl mx-auto text-[white]">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-xl font-semibold">New Article</h2>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-7 text-[#A2A1A8CC]">
          <input  type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none" />
          <input  type="text" placeholder="Summary" onChange={(e)=>setSummary(e.target.value)} className="p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833]  focus:outline-none" />
          <div className="mb-4">
            <label className="text-[white]" htmlFor="">Cover</label>
            <Upload.Dragger
            onChange={(info) => setCoverImageList(info.fileList)}
            className="border-dashed ant-upload-drag "
            >
            <p className="text-[white] text-xs">
              Bấm hoặc kéo thả hình ảnh vào đây để <br /> tải ảnh lên!
            </p>
          </Upload.Dragger>
          </div>
    
        </div>


           <div className="mt-8 w-full">
          <h3 className="text-lg mb-4">Content</h3>
          <div className="flex space-x-6 mb-4">
            <Button onClick={addInputField} className="bg-[#7152F3] text-[white] border-none">
              Add part
            </Button>
          
          </div>
          <div className="flex flex-col space-y-5 p-4">
            {inputFields.map((_, index) => (
             <div className="flex space-x-4 items-center">
              <p>Part {index + 1}</p>
               <input
                key={index}
                type="text"
                placeholder={`Subtitle`}
                onChange={(e) => handleFieldChange(index, "Subtitle", e.target.value)}
                className="p-2 w-[40%] rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                
              />
              <input
                key={index}
                type="text"
                placeholder={`Content`}
                onChange={(e) => handleFieldChange(index, "Content", e.target.value)}
                className="p-2 w-[40%] rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"/>
              <button onClick={() => removeInputField(index)}>x</button>
             </div>
            ))}
          </div>
        </div>
         {/* Questions Section */}
         <div className="mt-8">
          <h3 className="text-lg mb-4 w-full">Quizzes</h3>
          <Button
            onClick={addQuizQuestion}
            className="bg-[#7152F3] text-[white] border-none mb-4"
          >
            + Add question
          </Button>
          <div className="space-y-6">
            {quizQuestions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="p-4 bg-[#16151C] rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-[#A2A1A8]">Question {qIndex + 1}</h4>
                  <Button
                    onClick={() => removeQuizQuestion(qIndex)}
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
                        onChange={(e) => updateQuizQuestion(qIndex, "question", e.target.value)}
                        className="mt-4 p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                        />
                        <textarea
                        placeholder="Explanation"
                        value={question.explanation}
                        onChange={(e) => updateQuizQuestion(qIndex, "explanation", e.target.value)}
                        className="mt-6 p-2 rounded-lg bg-[#16151C] border border-[#A2A1A833] focus:outline-none"
                        rows={5}
                        />
                    </div>
                    <div className="mt-3 w-1/2">
                    {question.options.map((option:any, oIndex:any) => (
                        <div key={oIndex} className="flex items-center space-y-4 space-x-2">
                        <Radio
                            checked={question.correctOption === oIndex}
                            onChange={() => updateCorrectOption(qIndex, oIndex)}
                        />
                        <input
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            value={option}
                            onChange={(e) => updateQuizOption(qIndex, oIndex, e.target.value)}
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
          <Button onClick={handleCreateArticle} className="text-[white] bg-[#7152F3] border-none">
            Create
          </Button>
        </div>
      </form>
      
    </div>
  );
};

export default CreateArticleForm;

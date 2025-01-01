import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDateTime } from "../../../utils/formatter";
import ArticleService from "../../../services/ArticleService";
import { ArticleRes } from "../../../models/article";
import { Button, Dropdown, Menu } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";



const ArticleTable = () => {
  const [articles, setArticles] = useState<ArticleRes[]>([])
  const token = localStorage.getItem('token');
  useEffect(()=>{
    const fetchProblems = async () => {
      try{
        const articleService = new ArticleService();

        const response = await articleService.getAll(token);
        const data = response.data;
        setArticles(data.data);
      }catch (error: any) {
        toast.error(error.message || "Fail to load problems.");
      }

    }
    fetchProblems();
  }
  ,[])
  const renderActionsMenu = (article: ArticleRes) => (
    <Menu>
      <Menu.Item key="edit" >
        Edit
      </Menu.Item>
      <Menu.Item key="delete" danger>
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="p-4">
      <table className="w-full text-left border-collapse ">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 border-b border-[#A2A1A833]">Title</th>
            <th className="p-3 border-b border-[#A2A1A833]">Summary</th>
            
            <th className="p-3 border-b border-[#A2A1A833]">Created Time</th>
            <th className="p-3 border-b border-[#A2A1A833]"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#A2A1A833]">
          {articles.map((article, index) => (
            <tr
              key={index}
              className="hover:bg-gray-800 transition-colors duration-200"
            >
              <td className="p-5">{article.title}</td>
              <td className="p-5 m-5 ">
                <span >{article.summary}</span>
              </td>
   
              <td className="p-5">{formatDateTime(article.createdAt)}</td>
              <td className="p-5">
                <Dropdown overlay={renderActionsMenu(article)} trigger={["click"]}>
                  <button className="bg-no-repeat border-none text-white">
                  <BsThreeDotsVertical />
                  </button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;

import { CreateProblemReq } from "../models/problem";
import { apiClient } from "../utils/apiClient";
import { ARTICLE_ENDPOINT } from "../utils/constants";

export default  class ArticleService {
    constructor(){}
    async getByID(id: number) {
        const url = ARTICLE_ENDPOINT + `/${id}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }

    async getAll(token: string| null) {
      const url = ARTICLE_ENDPOINT;
      try {
        const res = await apiClient.get(url, {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        })
        return res;
      } catch (error) {
        throw error;
      }
  }
    

    async createProblem(req: CreateProblemReq){
      const url = ARTICLE_ENDPOINT + '/CreateProblem'
      try {
        const res = await apiClient.post(url, req)
        return res;
      } catch (error) {
        throw error;
      }
    }
    async getAllArticle() {
      const url = ARTICLE_ENDPOINT;
      try {
        const token = localStorage.getItem('token');
        const res = await apiClient.get(url, {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        });
        return res.data?.data;
      } catch (error) {
          console.error("Failed to update user:", error);
          throw error;
      }
    }
  
    static async getArticleById(id: number) {
      const url = ARTICLE_ENDPOINT + `/${id}`;
      try {
        const token = localStorage.getItem('token');
        const res = await apiClient.get(url, {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        });
        return res.data?.data;
      } catch (error) {
          console.error("Failed to update user:", error);
          throw error;
      }
    }
}
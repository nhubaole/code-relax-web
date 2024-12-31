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

    async getAll() {
      const url = ARTICLE_ENDPOINT;
      try {
        const res = await apiClient.get(url)
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
}
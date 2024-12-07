import { SubmitReq } from "../models/problem";
import { apiClient } from "../utils/apiClient";
import { PROBLEM_ENDPOINT } from "../utils/constants";

export default  class ProblemService {
    constructor(){}
    async getByID(id: number) {
        const url = PROBLEM_ENDPOINT + `/${id}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }
    
    async getTestCaseByProblem(id:number) {
        const url = PROBLEM_ENDPOINT + `/GetTestcase?problemID=${id}`
        try {
            const res = await apiClient.get(url)
            return res;
          } catch (error) {
            throw error;
          }
    }

    async submit(req: SubmitReq){
      const url = PROBLEM_ENDPOINT + '/Submit'
      try {
        const res = await apiClient.post(url, req)
        return res;
      } catch (error) {
        throw error;
      }
    }

    async runCode(req: SubmitReq){
      const url = PROBLEM_ENDPOINT + '/RunCode'
      try {
        const res = await apiClient.post(url, req)
        return res;
      } catch (error) {
        throw error;
      }
    }
}
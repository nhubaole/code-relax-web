import { CreateProblemReq, SubmitReq } from "../models/problem";
import { apiClient } from "../utils/apiClient";
import { PROBLEM_ENDPOINT } from "../utils/constants";

export default  class ProblemService {
    constructor(){}
    async getByID(id: number, token: string|null) {
        const url = PROBLEM_ENDPOINT + `/${id}`;
        try {
          const res = await apiClient.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          return res;
        } catch (error) {
          throw error;
        }
    }

    async getAll(token: string|null) {
      const url = PROBLEM_ENDPOINT;
      try {
        const res = await apiClient.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return res;
      } catch (error) {
        throw error;
      }
  }
    
    async getTestCaseByProblem(id:number, token: string) {
        const url = PROBLEM_ENDPOINT + `/GetTestcase?problemID=${id}`
        try {
            const res = await apiClient.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
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

    async createProblem(req: CreateProblemReq){
      const url = PROBLEM_ENDPOINT + '/CreateProblem'
      try {
        const res = await apiClient.post(url, req)
        return res;
      } catch (error) {
        throw error;
      }
    }
}
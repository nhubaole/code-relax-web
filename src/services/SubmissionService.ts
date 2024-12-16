import { apiClient } from "../utils/apiClient";
import {  SUBMISSION_ENDPOINT } from "../utils/constants";

export default  class SubmissionService {
    constructor(){}
    async getByProblemAndUserID(userId: number, problemId: number) {
        const url = SUBMISSION_ENDPOINT + `/get-by-problem-user`;
        try {
          const res = await apiClient.post(url, {problemID: problemId, userID: userId})
          return res;
        } catch (error) {
          throw error;
        }
    }
    async getByUserID(userId: number) {
        const url = SUBMISSION_ENDPOINT + `/User/${userId}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }
    async getStatisticByUserID(userId: number) {
        const url = SUBMISSION_ENDPOINT + `/user-statistic/${userId}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }
}
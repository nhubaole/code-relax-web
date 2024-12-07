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

}
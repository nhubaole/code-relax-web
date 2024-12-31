import { CreateDiscussionReq } from "../models/discussion";
import { apiClient } from "../utils/apiClient";
import { RATING_ENDPOINT } from "../utils/constants";

export default  class RatingService {
    constructor(){}
    async getByProblemID(id: number) {
        const url = RATING_ENDPOINT + `/Problem/${id}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }

    async getByID(id: number) {
        const url = RATING_ENDPOINT + `/${id}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }

    async create(req: CreateDiscussionReq) {
        const url = RATING_ENDPOINT;
        try {
          const res = await apiClient.post(url, req)
          return res;
        } catch (error) {
          throw error;
        }
    }
}
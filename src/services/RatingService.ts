import { CreateDiscussionReq } from "../models/discussion";
import { CreateRatingReq } from "../models/rating";
import { apiClient } from "../utils/apiClient";
import { RATING_ENDPOINT } from "../utils/constants";

export default  class RatingService {
    constructor(){}
    async getByProblemID(id: number, token: string|null) {
        const url = RATING_ENDPOINT + `/Problem/${id}`;
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

    async getByID(id: number, token: string) {
        const url = RATING_ENDPOINT + `/${id}`;
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

    async create(req: CreateRatingReq, token: string|null) {
        const url = RATING_ENDPOINT;
        try {
          const res = await apiClient.post(url, req,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          return res;
        } catch (error) {
          throw error;
        }
    }
}
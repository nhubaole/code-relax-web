import { CreateDiscussionReq } from "../models/discussion";
import { apiClient } from "../utils/apiClient";
import { DISCUSSION_ENDPOINT } from "../utils/constants";

export default  class DiscussionService {
    constructor(){}
    async getByProblemID(id: number, token: string|null) {
        const url = DISCUSSION_ENDPOINT + `/Problem/${id}`;
        try {
          const res = await apiClient.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          return res;
        } catch (error) {
          throw error;
        }
    }

    async getByID(id: number) {
        const url = DISCUSSION_ENDPOINT + `/${id}`;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }

    async create(req: CreateDiscussionReq, token: string| null) {
        const url = DISCUSSION_ENDPOINT;
        const formData = new FormData();

        Object.entries(req).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        try {
          const res = await apiClient.post(url, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Đảm bảo header phù hợp
              },
          });
          return res;
        } catch (error) {
          throw error;
        }
    }
}
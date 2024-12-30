import { apiClient } from "../utils/apiClient";
import { ARTICLE_ENDPOINT } from "../utils/constants";

export default class PackageService {
  constructor() {}

  static async getAllArticle() {
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

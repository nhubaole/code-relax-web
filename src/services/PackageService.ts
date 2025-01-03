import { apiClient } from "../utils/apiClient";
import { PROBLEM_ENDPOINT} from "../utils/constants";

export default class PackageService {
  constructor() {}

  static async getPackages() {
    try {
      const response = await fetch('http://localhost:5205/api/Package');
      const res = await response.json();
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTags() {
    try {
      const response = await fetch('http://localhost:5205/api/v1/Tags');
      const res = await response.json();
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProblem(token: string) {
    const url = PROBLEM_ENDPOINT;
    try {

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
  
  static async getProblemsById(id: number) {
    try {
        const response = await fetch(`http://localhost:5205/api/Package/${id}/problems`);
        const res = await response.json();
        return res.data;
    } catch (error) {
        console.error("Failed to fetch problems:", error);
        throw error;
    }
}

}

import { apiClient } from "../utils/apiClient";
import { PROBLEM_ENDPOINT} from "../utils/constants";

export default class PackageService {
  constructor() {}

  static async getPackages() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5205/api/Package', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const res = await response.json();
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProblem() {
    const url = PROBLEM_ENDPOINT;
    // try {
      const token = localStorage.getItem('token');
      const res = await apiClient.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
      });
      return res.data?.data;
    // } catch (error) {
    //     console.error("Failed to update user:", error);
    //     throw error;
    // }
  }  
}

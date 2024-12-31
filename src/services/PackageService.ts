import { apiClient } from "../utils/apiClient";
import { PROBLEM_ENDPOINT } from "../utils/constants";

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

    static async getAllProblem() {
            const url = PROBLEM_ENDPOINT;
            try {
              const res = await apiClient.get(url)
              return res.data?.data;
            } catch (error) {
              throw error;
            }
        }
  }

import { apiClient } from "../utils/apiClient";
import { TAG_ENDPOINT } from "../utils/constants";

export default  class TagService {
    constructor(){}
  
    async getAll() {
        const url = TAG_ENDPOINT;
        try {
          const res = await apiClient.get(url)
          return res;
        } catch (error) {
          throw error;
        }
    }

}
import { apiClient } from "../utils/apiClient";
import {  USER_ENDPOINT, AUT_ENDPOINT } from "../utils/constants";
import { UserLogInReq, UserSignUpReq, UserUpdateReq } from "../models/user"; 

export default class UserService {
  constructor() {} 

  async signUp(req: UserSignUpReq) {
    const url = AUT_ENDPOINT +'/Signup';
    try {
      const res = await apiClient.post(url, req);
      return res; 
    } catch (error) {
      throw error;
    }
  }  

  async logIn(req: UserLogInReq) {
    const url = AUT_ENDPOINT + '/Login';
    try {
      const res = await apiClient.post(url, req);
      return res;
    } catch (error) {
      throw error;
    }
  }
  
  async getCurrentUser(token: string) {
    const url = USER_ENDPOINT + '/CurrentUser'; 
    try {
      const res = await apiClient.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      return res.data?.data; 
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }  

  async updateUser(req: UserUpdateReq, token:string) {
    const url = USER_ENDPOINT + `/${req.id}`;

    const formData = new FormData();
    formData.append("Id", req.id.toString());
    formData.append("DisplayName", req.displayName);
    formData.append("Email", req.email);
    formData.append("Password", req.password);
    formData.append("Role", req.role.toString());
    formData.append("formFile", req.avatar); 
    formData.append("Google", req.google);
    formData.append("Github", req.github); 
    formData.append("Facebook", req.facebook); 

    try {
        const res = await apiClient.put(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
  }

  static async getLeaderBoard() {
    const url = USER_ENDPOINT + '/LeaderBoard'; 
    try {
      const token = localStorage.getItem('token'); 
      const res = await apiClient.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      return res.data?.data; 
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }  
}

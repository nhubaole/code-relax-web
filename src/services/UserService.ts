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

  static async logIn(req: UserLogInReq) {
    const url = AUT_ENDPOINT + '/Login';
    try {
      const res = await apiClient.post(url, req);
      const token = res.data?.data?.token;
      localStorage.setItem('token', token);  
      return res;
    } catch (error) {
      throw error;
    }
  }
  
  static async getCurrentUser() {
    const url = USER_ENDPOINT + '/CurrentUser'; 
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found'); 
      }
  
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

  static async updateUser(req: UserUpdateReq) {
    const url = USER_ENDPOINT + `/${req.id}`;
    const token = localStorage.getItem('token');    
    console.log("User updated:", req);
    console.log("User updated:", url);
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const res = await apiClient.put(url, req, {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        });
        console.log("User updated:", res);
        return res;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
  }
}

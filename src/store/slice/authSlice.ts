// Define UserInfo type
export type UserInfo = {
    id: number;
    displayName: string;
    avatarUrl: string;
    email: string;
    role: number;
    createdAt: Date;
    google: string;
    github: string;
    facebook: string;
    password: string;
    rank: number;
  };
  
  // Define AuthSlice interface with userInfo and setUserInfo
  export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
  }
  
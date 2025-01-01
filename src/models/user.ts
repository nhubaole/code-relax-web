export interface UserInfo {
    id: number;
    displayName: string;
    avatarUrl: string;
    email: string;
    role: number;
    createdAt: Date;
    google: string;
    github: string;
    facebook: string;
    password:string;
}

export interface UserSignUpReq {
    email: string;
    password: string;
    displayName: string;
}
  
export interface UserLogInReq {
    email: string;
    password: string;
}

export interface UserUpdateReq {
    id: number;
    displayName: string;
    email: string;
    password: string;
    role: number;
}
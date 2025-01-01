import { UserInfo } from "./user";

export interface DiscussionRes {
    id: number;
    user: UserInfo;
    problemID: number;
    content?: string;
    imageContent?: string;
    type: string;
    createdAt: string;
    updatedAt: string;

}

export interface CreateDiscussionReq {
    content?: string;
    formFile?: File;
    type: string;
    userID: number;
    problemID: number;
}
import { UserInfo } from "./user";

export interface DiscussionRes {
    id: number;
    user: UserInfo;
    problemID: number;
    content: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;

}

export interface CreateDiscussionReq {
    content: string;
    type: string;
    userID: number;
    problemID: number;
}
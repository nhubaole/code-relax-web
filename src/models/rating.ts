export interface User {
    id: number;
    displayName: string;
    email: string;
    password: string;
    role: number;
    createdAt: string;
    google: string | null;
    github: string | null;
    facebook: string | null;
}

export interface RatingRes {
    numberOfStar: number;
    problemID: number;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRatingReq {
    numberOfStar: number;
    problemID: number;
    userID: number;
}
export interface ArticleByIdReq {
    id: number;
    title: string;
    summary: string;
    subTitle: string[];
    cover : string;
    content: string[];
    createdAt: Date;
    updatedAt: Date;
    userID: number;
    quizzes: Quiz[];
}

export interface Quiz {
    id: number;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
    explanation: string;
}

export interface ArticleGetAllReq {
    id: number;
    title: string;
    summary: string;
    cover:string;
}
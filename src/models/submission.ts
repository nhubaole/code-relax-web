import { ProblemRes } from "./problem";

export interface SubmissionRes {
    id: number; // ID của submission
    code: string; // Mã code được submit
    language: string; // Ngôn ngữ lập trình
    problem: ProblemRes; // ID của bài toán
    userID: number; // ID của người dùng
    status: number; // Trạng thái submission (0: chưa xử lý, 1: thành công, 2: thất bại, etc.)
    result: string; // Kết quả của submission, ví dụ: "12/12"
    note: string;
    createdAt: string;
}

export interface SubmissionStatisticRes {
    easyCount: number;
    mediumCount: number;
    hardCount: number;
    numOfSubmissions: number;
    acceptanceRate: number;
}
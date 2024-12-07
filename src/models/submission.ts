export interface SubmissionRes {
    id: number; // ID của submission
    code: string; // Mã code được submit
    language: string; // Ngôn ngữ lập trình
    problemID: number; // ID của bài toán
    userID: number; // ID của người dùng
    status: number; // Trạng thái submission (0: chưa xử lý, 1: thành công, 2: thất bại, etc.)
    result: string; // Kết quả của submission, ví dụ: "12/12"
    note: string;
    createdAt: string;
}
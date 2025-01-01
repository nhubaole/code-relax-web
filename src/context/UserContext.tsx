import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho currentUser
type UserInfo = {
  id: number;
  email: string;
  displayName: string;
  role: string;
};

// Định nghĩa kiểu dữ liệu cho Context
type UserContextType = {
  currentUser: UserInfo | null; // Dữ liệu người dùng
  setCurrentUser: (user: UserInfo | null) => void; // Hàm cập nhật dữ liệu
};

// Tạo Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider cho toàn bộ app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null); // Giá trị ban đầu là null

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser phải được sử dụng trong UserProvider');
  }
  return context;
};

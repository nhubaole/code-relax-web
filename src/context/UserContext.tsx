import React, { createContext, useContext, useState } from 'react';

interface User {
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
}

const UserContext = createContext<{
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser phải được sử dụng bên trong UserProvider');
    }
    return context;
};

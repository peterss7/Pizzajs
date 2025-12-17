import { createContext } from "react";
import type { AccountDto } from "../types/AccountDto";

export type LoginRequest = {
    username: string;
    password: string;
}

export type AuthContextValue = {
    currentUser: AccountDto | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (req: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshMe: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

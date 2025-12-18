import { createContext } from "react";
import type { User } from "../types/User";

export type LoginRequest = {
    email: string;
    password: string;
}

export type SignupRequest = LoginRequest;

export type AuthContextValue = {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (req: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    signup: (req: SignupRequest) => Promise<void>;
    refreshMe: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

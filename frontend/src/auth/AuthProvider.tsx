import { type ReactNode, useState, useEffect, useMemo } from "react";
import { AuthContext, type AuthContextValue, type LoginRequest, type SignupRequest } from "./AuthContext";
import useAuthApi from "../api/useAuthApi";
import type { User } from "../types/User";

type Props = {
    children: ReactNode;
}


export function AuthProvider({
    children
}: Props) {

    const { meApi, signupApi } = useAuthApi();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function refreshMe() {
        try {
            const user = await meApi();
        } catch {
            // 401 or error = like logout
            setCurrentUser(null);
        }

    }

    async function login(req: LoginRequest) {
        console.log("Logging in...");
        console.log(`user: ${req.email}, pw: ${req.password}`);


    }

    async function logout() {
        try {
            // await logoutApi();
        } finally {
            setCurrentUser(null);
        }
    }

    async function signup(req: SignupRequest) {
        const user = await signupApi(req)
        setCurrentUser(user);
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await refreshMe();
            setIsLoading(false);
        })();
    }, []);


    const contextValue = useMemo<AuthContextValue>(() => {
        return {
            login,
            logout,
            signup,
            refreshMe,
            isLoading,
            currentUser,
            isAuthenticated: !!currentUser,
        }
    }, [currentUser, isLoading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
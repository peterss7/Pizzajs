import { type ReactNode, useState, useEffect, useMemo } from "react";
import { meApi, type LoginRequest, loginApi, logoutApi } from "../api/auth";
import type { AccountDto } from "../types/AccountDto";
import { AuthContext, type AuthContextValue } from "./AuthContext";

type Props = {
    children: ReactNode;
}


export function AuthProvider({
    children
}: Props) {

    const [currentUser, setCurrentUser] = useState<AccountDto | null>(null);
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
        const user = await loginApi(req);
        setCurrentUser(user);
    }

    async function logout() {
        try {
            await logoutApi();
        } finally {
            setCurrentUser(null);
        }
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
// src/features/account/api/useAccountApi.ts
import { useCallback, useState } from "react";
import { BASE_URL } from "./API_CONSTANTS";
import type { AccountDto } from "../types/AccountDto";


export type CreateAccountRequest = {
    password: string;
    name: string;
};

export function useAccountApi() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postAccount = useCallback(async (payload: CreateAccountRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // if you’re using cookie auth, uncomment:
                // credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let message = `Request failed (${res.status})`;
                try {
                    const data = await res.json();
                    message = data?.message ?? data?.error ?? message;
                } catch {
                    // ignore JSON parse error
                }
                throw new Error(message);
            }

            // Handle empty 204 responses safely
            const text = await res.text();
            return (text ? (JSON.parse(text) as AccountDto) : null) as AccountDto | null;
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Unknown error";
            setError(msg);
            throw e; // so callers can handle it too
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getAccounts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // if you’re using cookie auth, uncomment:
                // credentials: "include",
            });

            if (!res.ok) {
                let message = `Request failed (${res.status})`;
                try {
                    const data = await res.json();
                    message = data?.message ?? data?.error ?? message;
                } catch {
                    // ignore JSON parse error
                }
                throw new Error(message);
            }

            // Handle empty 200 responses safely
            const text = await res.text();
            return (text ? (JSON.parse(text) as AccountDto[]) : null) as AccountDto[] | null;
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Unknown error";
            setError(msg);
            throw e; // so callers can handle it too
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { 
        postAccount,
        getAccounts,
        isLoading, 
        error, 
        clearError: () => setError(null) 
    };
}

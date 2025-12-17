import type { LoginRequest } from "../auth/AuthContext";
import type { AccountDto } from "../types/AccountDto";
import { api } from "./http";


export default function useAuthApi() {

  function login(body: LoginRequest) {
    return api<boolean>("/auth/", {
      method: "GET",
      body: JSON.stringify(body),
    });
  }

  function meApi() {
    return api<AccountDto>("/auth/me", { method: "GET" });
  }

  function logout() {
    return api<{ message: string }>("/auth/logout", { method: "POST" });
  }

  return {
    logout, meApi, login
  }
}

import type { AccountDto } from "../types/AccountDto";
import { api } from "./http";

export type LoginRequest = { email: string; password: string };

export function loginApi(body: LoginRequest) {
  return api<AccountDto>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function meApi() {
  return api<AccountDto>("/auth/me", { method: "GET" });
}

export function logoutApi() {
  return api<{ message: string }>("/auth/logout", { method: "POST" });
}

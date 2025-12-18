import type { LoginRequest, SignupRequest } from "../auth/AuthContext";
import type { AccountDto } from "../types/AccountDto";
import type { User } from "../types/User";
import { api } from "./http";


export default function useAuthApi() {

  function loginApi(body: LoginRequest) {
    return api<boolean>("/auth/", {
      method: "GET",
      body: JSON.stringify(body),
    });
  }

  function meApi() {
    return api<AccountDto>("/auth/me", { method: "GET" });
  }

  function logoutApi() {
    return api<{ message: string }>("/auth/logout", { method: "POST" });
  }

  function signupApi(body: SignupRequest) {
    return api<User>("/auth/signup",
      { 
        method: "POST",
        body: JSON.stringify(body),
      });
  }

  return {
    logoutApi, meApi, loginApi, signupApi
  }
}

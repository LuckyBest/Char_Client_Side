import $api from "../http/index";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/authRespose";

export default class AuthService {
  public static async registration(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { login, password });
  }

  public static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { login, password });
  }

  public static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
//

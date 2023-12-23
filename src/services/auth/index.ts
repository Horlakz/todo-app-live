// import { Client } from "../services/api-client";
import { Client } from "../api-client";
import {
  LoginRequestPayload,
  LoginResponsePayload,
  RegistrationRequestPayload,
  RegistrationResponsePayload,
} from "./auth.interface";

export class AuthService {
  private apiClient = new Client();

  login(data: LoginRequestPayload) {
    return this.apiClient.post<LoginRequestPayload, LoginResponsePayload>(
      "login",
      data
    );
  }

  register(data: RegistrationRequestPayload) {
    return this.apiClient.post<
      RegistrationRequestPayload,
      RegistrationResponsePayload
    >("register", data);
  }

  user() {
    return this.apiClient.get("user");
  }
}

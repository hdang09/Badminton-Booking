import { IUser } from "@/features/users";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ILogin {
  token: string;
  user?: IUser;
}

export interface IRefreshToken {
  accessToken: string;
  accessTokenExp: number;
  refreshToken: string;
  refreshTokenExp: number;
}

export interface ILogout {
  message: string;
  success: boolean;
}

export interface ISession {
  userId: string;
  roleId: string;
  sessionId: string;
}

export interface ISessionUser {
  session: ISession;
  user?: IUser;
}

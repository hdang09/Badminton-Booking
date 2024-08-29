import { ILogout } from "@/features/auth/types";

export interface IUpdateUser extends ILogout { }

export interface IUser {
  phone: number;
  email: string;
  isActive: boolean;
  gender: string;
  dob: string;
  name: string;
  role: string;
  token: string;
  active: boolean;
  id: number;
}

export interface UserCredentials {
  fullName: string;
  phone: string;
  address: string | null;
  avatar: string | null;
  birthday: string | null;
}

export interface UserPasswordCredentials {
  oldPassword: string;
  newPassword: string;
}

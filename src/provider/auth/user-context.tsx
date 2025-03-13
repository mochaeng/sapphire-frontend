import { createContext } from "react";

export type AuthUser = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName?: string;
  roleName: string;
  isAuthenticated: boolean;
};

export type AuthUserState = {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  isReady: boolean;
};

const initialState: AuthUserState = {
  user: {} as AuthUser,
  setUser: () => null,
  logout: () => null,
  isReady: false,
};

export const AuthUserContext = createContext<AuthUserState>(initialState);

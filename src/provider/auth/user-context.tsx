import { createContext } from "react";

export type AuthUser = {
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
};

const initialState: AuthUserState = {
  user: {} as AuthUser,
  setUser: () => null,
  logout: () => null,
};

export const AuthUserContext = createContext<AuthUserState>(initialState);

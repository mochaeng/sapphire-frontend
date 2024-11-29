import { createContext } from "react";

export type AuthUser = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roleName: string;
};

export type AuthUserState = {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
};

const initialState: AuthUserState = {
  user: {} as AuthUser,
  setUser: () => null,
};

export const AuthUserContext = createContext<AuthUserState>(initialState);

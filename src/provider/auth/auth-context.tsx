import { createContext } from "react";

type AuthCtx = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthCtx | null>(null);

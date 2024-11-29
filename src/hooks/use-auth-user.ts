import { AuthUserContext } from "@/provider/auth/user-context";
import { useContext } from "react";

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);

  if (!context)
    throw new Error("useAuthUser must be within an AuthUserProvider");

  return context;
};

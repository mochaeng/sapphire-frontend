import { useEffect, useState } from "react";
import { AuthUserContext, AuthUser } from "./user-context";
import { fetchAuthMe } from "@/lib/api/auth";
import { ServerError, UnauthorizedError } from "@/lib/api/errors";
import { useMutation } from "@tanstack/react-query";

export default function AuthUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({} as AuthUser);
  const { mutate, isPending } = useMutation({
    mutationFn: fetchAuthMe,
    onSuccess: (authUser) => {
      setUser(authUser);
    },
    onError: (error) => {
      if (error instanceof UnauthorizedError || error instanceof ServerError) {
        setUser((u) => ({ ...u, isAuthenticated: false }));
      }
    },
  });

  useEffect(() => mutate(), [mutate]);

  const logout = () => {
    setUser((u) => ({ ...u, isAuthenticated: false }));
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  const isReady = user.isAuthenticated !== undefined;

  return (
    <AuthUserContext.Provider value={{ user, setUser, logout, isReady }}>
      {children}
    </AuthUserContext.Provider>
  );
}

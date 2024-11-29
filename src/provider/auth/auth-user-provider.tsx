import { useEffect, useState } from "react";
import { AuthUserContext, AuthUser } from "./user-context";
import { authMe } from "@/lib/api/auth";
import { DefaultError, ServerError, UnauthorizedError } from "@/lib/api/errors";
import { useAuth } from "@/hooks/use-auth";
import { AuthMeResponseSchema } from "@/lib/api/responses";

export default function AuthUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({} as AuthUser);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    async function getAuthUserInfo() {
      try {
        const response = await authMe();
        const parsed = AuthMeResponseSchema.safeParse(response.data);
        if (!parsed.success) {
          throw new DefaultError("fail parsing");
        }
        const user: AuthUser = {
          email: parsed.data.email,
          firstName: parsed.data.first_name,
          lastName: parsed.data.last_name || "",
          username: parsed.data.username,
          roleName: parsed.data.role_name,
        };
        setUser(user);
      } catch (error) {
        if (
          error instanceof UnauthorizedError ||
          error instanceof ServerError
        ) {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getAuthUserInfo();
  }, [setIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}

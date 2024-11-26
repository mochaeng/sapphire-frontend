import { API_URL } from "@/lib/api/api";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch(`${API_URL}/v1/auth/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.log("error checking auth status:", error);
        setIsAuthenticated(false);
      }
    }

    checkAuthStatus();
  }, []);

  useEffect(() => {
    console.log("auth", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

import { useAuthUser } from "@/hooks/use-auth-user";
import { fetchAuthMe } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthUser();

  const authMeMutation = useMutation({
    mutationFn: fetchAuthMe,
    onSuccess: (user) => {
      setUser({ ...user, isAuthenticated: true });
      navigate("/");
    },
    onError: (error) => {
      console.error("auth failed after OAuth: ", error);
      setUser({ ...user, isAuthenticated: false });
      navigate("/", {
        state: { error: "Authentication failed after OAuth login" },
      });
    },
  });

  useEffect(() => {
    authMeMutation.mutate();
  }, [authMeMutation]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold">Processing your login...</h2>
        <p>Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}

export default OAuthSuccess;

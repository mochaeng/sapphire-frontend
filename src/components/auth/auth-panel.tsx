import { cn } from "@/lib/utils";
import SigninForm from "./signin-form";
import SignupForm from "./signup-form";
import { Button } from "../ui/button";
import { useState } from "react";

function AuthPanel() {
  const [isLogin, setIsLogin] = useState(true);

  let title = "Log in";
  if (!isLogin) {
    title = "Create your account";
  }

  const handleOpenSignup = () => {
    setIsLogin(false);
  };

  const handleOpenLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center pt-5 lg-1:pb-16 lg-1:pt-16">
      <div className="grid w-full max-w-[1080px] grid-cols-1 gap-6 lg-1:grid-cols-2">
        <HalfColorScreen className="hidden bg-primary lg-1:block" />
        <section className="flex justify-center">
          <div className="w-full max-w-authForm lg-1:text-white">
            <p className="text-4xl">Sapphire</p>
            <p className="text-2xl">Community with Purpose</p>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-2">
          <div className="w-full max-w-authForm">
            <p className="mb-1 font-medium">{title}</p>
          </div>
          {isLogin ? <SigninForm /> : <SignupForm />}
          <AuxPanel
            onOpenLogin={handleOpenLogin}
            onOpenSignup={handleOpenSignup}
            isLogin={isLogin}
          />
        </section>
      </div>
    </div>
  );
}

function AuxPanel({
  isLogin,
  onOpenSignup,
  onOpenLogin,
}: {
  isLogin: boolean;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
}) {
  const loginHelpers = (
    <div>
      <Button variant={"link"}>Forgot password?</Button>
      <span className="w-4 text-secondaryOnly">&#xb7;</span>
      <Button onClick={onOpenSignup} variant={"link"}>
        Sign up for Sapphire
      </Button>
    </div>
  );

  const signUpHelpers = (
    <div className="flex items-center justify-center">
      <p>Already have an account?</p>
      <Button onClick={onOpenLogin} variant={"link"}>
        Log in
      </Button>
    </div>
  );

  return <div>{isLogin ? loginHelpers : signUpHelpers}</div>;
}

function HalfColorScreen({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("absolute bottom-0 left-0 top-0 z-[-1] w-1/2", className)}
    ></div>
  );
}

export default AuthPanel;

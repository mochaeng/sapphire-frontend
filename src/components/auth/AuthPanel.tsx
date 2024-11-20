import { cn } from "@/lib/utils";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidUsername,
} from "@/lib/authValidation";
import useInputForm from "@/hooks/useInput";

function AuthPanel() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useInputForm("", isValidEmail);
  const passwordInput = useInputForm("", isValidPassword);
  const nameInput = useInputForm("", isValidName);
  const usernameInput = useInputForm("", isValidUsername);

  let title = "Log in";
  if (!isLogin) {
    title = "Create your account";
  }

  const cleanErrors = () => {
    emailInput.setErrorMessage("");
    passwordInput.setErrorMessage("");
  };

  const handleOpenSignup = () => {
    setIsLogin(false);
    cleanErrors();
  };

  const handleOpenLogin = () => {
    setIsLogin(true);
    cleanErrors();
  };

  return (
    <div className="relative flex w-full items-center justify-center pt-5 lg-1:pb-16 lg-1:pt-16">
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
            <p className="mb-4 font-semibold">{title}</p>
          </div>
          {isLogin ? (
            <SigninForm
              emailInput={emailInput}
              passwordInput={passwordInput}
              className="max-w-authForm"
            />
          ) : (
            <SignupForm
              nameInput={nameInput}
              usernameInput={usernameInput}
              emailInput={emailInput}
              passwordInput={passwordInput}
              className="max-w-authForm"
            />
          )}
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

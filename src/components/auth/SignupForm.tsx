import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import AuthFormButton from "./AuthFormButton";
import ErrorField from "./ErrorField";
import { InputForm } from "@/hooks/useInput";
import { useState } from "react";
import { SignupPayload } from "@/lib/api/payloads";
import { ConflictError, signup } from "@/lib/api/api";

function SignupForm({
  emailInput,
  passwordInput,
  nameInput,
  usernameInput,
  className,
  ...props
}: {
  emailInput: InputForm;
  passwordInput: InputForm;
  nameInput: InputForm;
  usernameInput: InputForm;
} & React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  console.log(isLoading);

  const isButtonDisable =
    nameInput.value.trim().length === 0 ||
    usernameInput.value.trim().length === 0 ||
    emailInput.value.trim().length === 0 ||
    passwordInput.value.trim().length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nameInput.isValid() ||
      !usernameInput.isValid() ||
      !emailInput.isValid() ||
      !passwordInput.isValid()
    ) {
      return;
    }

    async function fetchSignup() {
      setIsLoading(true);
      const payload: SignupPayload = {
        email: emailInput.value,
        first_name: nameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
      };

      try {
        const data = await signup(payload);
        console.log(data);
      } catch (err) {
        if (err instanceof ConflictError) {
          if (err.message === "e-mail already taken") {
            emailInput.setErrorMessage(err.message);
          }
          if (err.message === "username already taken") {
            usernameInput.setErrorMessage(err.message);
          }
        }
      }
      setIsLoading(false);
    }

    fetchSignup();
  };

  return (
    <form
      onSubmit={handleSubmit}
      {...props}
      className={cn("flex w-full flex-col gap-6", className)}
    >
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          value={nameInput.value}
          onChange={nameInput.handleChange}
          onBlur={nameInput.handleBlur}
        />
        <ErrorField
          hasError={nameInput.hasError}
          error={nameInput.errorMessage}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          name="username"
          value={usernameInput.value}
          onChange={usernameInput.handleChange}
          onBlur={usernameInput.handleBlur}
        />
        <ErrorField
          hasError={usernameInput.hasError}
          error={usernameInput.errorMessage}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          value={emailInput.value}
          onChange={emailInput.handleChange}
          onBlur={emailInput.handleBlur}
        />
        <ErrorField
          hasError={emailInput.hasError}
          error={emailInput.errorMessage}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          value={passwordInput.value}
          onChange={passwordInput.handleChange}
          onBlur={passwordInput.handleBlur}
        />
        <ErrorField
          hasError={passwordInput.hasError}
          error={passwordInput.errorMessage}
        />
      </div>
      {isLoading && (
        <p className="w-full text-center text-primary">Loading...</p>
      )}
      <AuthFormButton disabled={isButtonDisable}>SIGN UP</AuthFormButton>
    </form>
  );
}

export default SignupForm;

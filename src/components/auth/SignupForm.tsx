import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import AuthFormButton from "./AuthFormButton";
import ErrorField from "./ErrorField";
import { InputForm } from "@/hooks/useInput";
import { useState } from "react";
import { SignupPayload } from "@/lib/api/payloads";
import { ConflictError, DefaultError, signup } from "@/lib/api/api";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isButtonDisable =
    nameInput.value.trim().length === 0 ||
    usernameInput.value.trim().length === 0 ||
    emailInput.value.trim().length === 0 ||
    passwordInput.value.trim().length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !nameInput.isValid() ||
      !usernameInput.isValid() ||
      !emailInput.isValid() ||
      !passwordInput.isValid()
    ) {
      return;
    }

    async function fetchSignup() {
      setIsSubmitting(true);

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
        if (err instanceof DefaultError) {
          setError(err.message);
        }
      }

      setIsSubmitting(false);
    }

    fetchSignup();
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
        <ErrorField
          hasError={passwordInput.hasError}
          error={passwordInput.errorMessage}
        />
      </div>
      {isSubmitting && (
        <p className="text-center text-primary text-sm">Loading...</p>
      )}
      {!isSubmitting && error && (
        <p className="text-center text-sm text-rose-500">{error}</p>
      )}
      <AuthFormButton disabled={isButtonDisable}>SIGN UP</AuthFormButton>
    </form>
  );
}

export default SignupForm;

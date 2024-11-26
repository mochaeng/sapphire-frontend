import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import AuthFormButton from "./AuthFormButton";
import ErrorField from "./ErrorField";
import { InputForm } from "@/hooks/useInput";
import { Form, useNavigate } from "react-router-dom";
import { SigninPayload } from "@/lib/api/payloads";
import { DefaultError, signin, WrongEmailOrPassword } from "@/lib/api/api";
import { useState } from "react";
import { useAuth } from "@/provider/auth/useAuth";

function SigninForm({
  emailInput,
  passwordInput,
  className,
  ...props
}: {
  emailInput: InputForm;
  passwordInput: InputForm;
} & React.HtmlHTMLAttributes<HTMLFormElement>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const isButtonDisable =
    emailInput.value.trim().length === 0 ||
    passwordInput.value.trim().length === 0;
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsAuthenticated(false);

    if (!emailInput.isValid() || !passwordInput.isValid) return;

    async function fetchSignin() {
      setIsSubmitting(true);

      const payload: SigninPayload = {
        email: emailInput.value,
        password: passwordInput.value,
      };

      try {
        const data = await signin(payload);
        console.log(data);
        setIsSubmitting(false);
        setIsAuthenticated(true);
        navigate("/");
      } catch (err) {
        if (err instanceof DefaultError) {
          setError(err.message);
        }
        if (err instanceof WrongEmailOrPassword) {
          passwordInput.setErrorMessage(err.message);
        }
        setIsAuthenticated(false);
      }
    }
    setIsSubmitting(false);
    fetchSignin();
  };

  return (
    <Form
      {...props}
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col gap-4", className)}
    >
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
      <AuthFormButton disabled={isButtonDisable}>LOG IN</AuthFormButton>
    </Form>
  );
}

export default SigninForm;

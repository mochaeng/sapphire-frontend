import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import AuthFormButton from "./AuthFormButton";
import { InputForm } from "../hooks/useInput";
import ErrorField from "./ErrorField";

function SigninForm({
  emailInput,
  passwordInput,
  className,
  ...props
}: {
  emailInput: InputForm;
  passwordInput: InputForm;
} & React.HtmlHTMLAttributes<HTMLFormElement>) {
  const isButtonDisable =
    emailInput.value.trim().length === 0 ||
    passwordInput.value.trim().length === 0;

  return (
    <form {...props} className={cn("flex w-full flex-col gap-4", className)}>
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
          value={passwordInput.value}
          onChange={passwordInput.handleChange}
          onBlur={passwordInput.handleBlur}
        />
        <ErrorField
          hasError={passwordInput.hasError}
          error={passwordInput.errorMessage}
        />
      </div>
      <AuthFormButton disabled={isButtonDisable}>LOG IN</AuthFormButton>
    </form>
  );
}

export default SigninForm;

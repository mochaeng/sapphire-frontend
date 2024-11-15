import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import AuthFormButton from "./AuthFormButton";
import ErrorField from "./ErrorField";
import { InputForm } from "../hooks/useInput";

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

    // console.log("hre");
    // console.log(emailInput.errorMessage);
    // nameInput.setErrorMessage("PLEASE ENTER VALID NAME");
    // emailInput.setErrorMessage("email already taken");
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
          value={passwordInput.value}
          onChange={passwordInput.handleChange}
          onBlur={passwordInput.handleBlur}
        />
        <ErrorField
          hasError={passwordInput.hasError}
          error={passwordInput.errorMessage}
        />
      </div>
      <AuthFormButton disabled={isButtonDisable}>SIGN UP</AuthFormButton>
    </form>
  );
}

export default SignupForm;

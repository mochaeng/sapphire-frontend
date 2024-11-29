import { Button } from "../ui/button";

function AuthFormButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      className="rounded-full p-6 font-semibold hover:bg-blue-800"
    >
      {children}
    </Button>
  );
}

export default AuthFormButton;

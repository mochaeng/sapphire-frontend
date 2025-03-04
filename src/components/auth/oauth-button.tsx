import { cn } from "@/lib/utils";

function OAuthButton({
  description,
  children,
  className,
  ...rest
}: { description: string } & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex h-11 w-full cursor-pointer items-center justify-start rounded-full border-2 border-primary bg-primary text-center text-small font-medium text-white shadow hover:bg-primary/90",
        className,
      )}
      {...rest}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-l-full bg-white">
        {children}
      </span>
      <span className="w-full">{description}</span>
    </button>
  );
}

export default OAuthButton;

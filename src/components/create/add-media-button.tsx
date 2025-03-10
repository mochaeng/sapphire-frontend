import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function AddMediaButton({
  children,
  disabled,
  ...props
}: {
  disabled?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn("h-8 w-8 rounded-full p-1 disabled:opacity-45", {
        "hover:bg-secondary hover:text-primary": !disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function ImageMediaButton({
  Icon,
  disableMediaButtons,
}: {
  Icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
  disableMediaButtons?: boolean;
}) {
  return (
    <Icon
      size={22}
      className={cn("disabled:opacity-15", {
        "hover:bg-secondary hover:text-primary": !disableMediaButtons,
      })}
    />
  );
}

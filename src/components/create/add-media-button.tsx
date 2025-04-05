import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

export const AddMediaButton = React.memo(function AddMediaButton({
  children,
  disabled,
  className,
  ...props
}: {
  disabled?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full p-1 disabled:opacity-45",
        {
          "hover:bg-secondary hover:text-primary": !disabled,
        },
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export const ImageMediaButton = React.memo(function ImageMediaButton({
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
});

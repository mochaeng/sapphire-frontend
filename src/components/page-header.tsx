import { cn } from "@/lib/utils";

function PageHeader({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "border-custom/25 sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b-1 bg-background p-2 text-profileHeader",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default PageHeader;

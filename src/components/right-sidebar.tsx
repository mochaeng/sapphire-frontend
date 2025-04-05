import { cn } from "@/lib/utils";

function RightSidebar({
  children,
  className,
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "z-[-10] hidden border-l-1 border-custom/25 lg-2:flex lg-2:w-full lg-2:max-w-rightWrapper lg-2:justify-center",
        className,
      )}
    >
      <div className="flex h-screen w-full max-w-[378px] flex-col p-4 lg-2:sticky lg-2:top-0">
        {children}
      </div>
    </div>
  );
}

export default RightSidebar;

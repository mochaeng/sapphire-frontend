import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function AccountMenu({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          side="left"
          className="absolute bottom-full left-10 top-10 mb-2 h-80 w-[400px]"
        >
          <SheetHeader>
            <SheetTitle>My profile</SheetTitle>
            <SheetDescription>Make changes to your profile.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AccountMenu;

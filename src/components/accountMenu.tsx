import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import {
  Bookmark,
  CircleUserRound,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { useTheme } from "@/hooks/useTheme";

function AccountMenu({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { theme, setTheme } = useTheme();

  let iconTheme = <Moon />;
  let iconText = "Dark Mode";
  if (theme === "light") {
    iconTheme = <Sun />;
    iconText = "Light Mode";
  }

  const isMobile = useMediaQuery("(max-width: 499px)");
  const side = isMobile ? "right" : "left";

  return (
    <div {...props}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          side={side}
          className="w-2/3 rounded-lg px-0 py-6 md:absolute md:bottom-full md:left-10 md:top-10 md:mb-2 md:h-96 md:w-64"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-2 text-sm text-primaryOnly">
            <div className="space-y-2 px-4">
              <Avatar className="-mt-1 size-12">
                <AvatarImage
                  src="https://github.com/naesamo.png "
                  className="object-contain"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Aurora霏霏</span>
                <span className="text-secondaryOnly">@aurora_hu</span>
              </div>
            </div>
            <Separator />
            <div className="px-2 text-sm">
              <SheetButton as="a" href="/car">
                <CircleUserRound />
                <span>My profile</span>
              </SheetButton>
              <SheetButton as="a" href="/">
                <Bookmark />
                <span>Collections</span>
              </SheetButton>
              <SheetButton as="a" href="/">
                <Settings />
                <span>Settings</span>
              </SheetButton>
            </div>
            <Separator />
            <div className="px-2">
              <button className="flex w-full items-center gap-2 rounded-full p-2 hover:bg-primary-foreground hover:text-primary">
                {iconTheme}
                <span>{iconText}</span>
              </button>
            </div>
            <Separator />
            <div className="px-2">
              <SheetButton as="button">
                <LogOut />
                <span>Logout</span>
              </SheetButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SheetButton({
  as = "a",
  href,
  children,
}: {
  as: "a" | "button";
  href?: string;
  children: React.ReactNode;
}) {
  const classes =
    "flex items-center gap-2 rounded-full p-2 hover:bg-primary-foreground hover:text-primary w-full";

  if (as === "a") {
    return (
      <Link to={href as string} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cn("hover:text-primary", classes)}>{children}</button>
  );
}

export default AccountMenu;

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import {
  Bookmark,
  CircleUserRound,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useMutation } from "@tanstack/react-query";
import { fetchAuthSignout } from "@/lib/api/auth";

function AccountMenu({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthUser();
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);
  const isMobile = useMediaQuery("(max-width: 499px)");

  const { mutate } = useMutation({
    mutationFn: fetchAuthSignout,
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const portal = isMobile ? document.body : document.getElementById("header");
    setPortalContainer(portal);
  }, [isMobile]);

  const side = isMobile ? "right" : "top";
  let iconTheme = <Moon />;
  let iconText = "Light Mode";
  if (theme === "light") {
    iconTheme = <Sun />;
    iconText = "Dark Mode";
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const signoutHandle = () => {
    if (user.isAuthenticated) {
      mutate();
    }
  };

  const separatorClasses = "h-[1px] bg-secondaryOnly opacity-25";

  return (
    <div className="relative" {...props}>
      <Sheet>
        {children}
        <SheetContent
          side={side}
          container={portalContainer}
          className="px-0 py-6 md:absolute md:left-2 md:top-10 md:h-96 md:w-64 md:rounded-md"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>A dialog for your account</SheetTitle>
            <SheetDescription>
              A dialog that contains some buttons to other pages, a option to
              change theme, and a button to logout from the application
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-2 text-sm text-primaryOnly">
            <div className="space-y-2 px-4">
              <Avatar className="-mt-1 size-12 bg-background">
                {user.isAuthenticated ? (
                  <>
                    <AvatarImage
                      src="https://github.com/mochaeng.png"
                      className="object-contain"
                    />
                    <AvatarFallback className="bg-secondaryOnlyPlaceholder text-lg text-primary">
                      CN
                    </AvatarFallback>
                  </>
                ) : (
                  <div className="bg-secondaryOnlyPlaceholder">
                    <User className="!size-12 p-2 text-secondaryOnly" />
                  </div>
                )}
              </Avatar>
              {user.isAuthenticated && (
                <div className="flex flex-col">
                  <span className="text-base font-semibold">
                    {user.firstName}
                  </span>
                  <span className="text-secondaryOnly">@{user.username}</span>
                </div>
              )}
            </div>
            {user.isAuthenticated && (
              <>
                <Separator className={separatorClasses} />
                <div className="px-2 text-sm">
                  <SheetButton as="a" href={`${user.username}`}>
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
              </>
            )}
            <Separator className={separatorClasses} />
            <div className="px-2">
              <button
                onClick={toggleTheme}
                className="flex w-full items-center gap-2 rounded-full p-2 hover:bg-primary-foreground hover:text-primary"
              >
                {iconTheme}
                <span>{iconText}</span>
              </button>
            </div>
            <Separator className={separatorClasses} />
            <div className="px-2">
              {user.isAuthenticated ? (
                <SheetButton as="button" onSignout={signoutHandle}>
                  <LogOut />
                  <span>Logout</span>
                </SheetButton>
              ) : (
                <SheetButton as="a" href="/">
                  <User />
                  <span>Login</span>
                </SheetButton>
              )}
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
  onSignout,
}: {
  as: "a" | "button";
  href?: string;
  children: React.ReactNode;
  onSignout?: () => void;
}) {
  const classes =
    "flex items-center gap-2 rounded-full p-2 hover:bg-secondary hover:text-primary w-full";

  if (as === "a") {
    return (
      <SheetClose asChild>
        <Link to={href ? "/" : ""} className={classes}>
          {children}
        </Link>
      </SheetClose>
    );
  }
  return (
    <SheetClose asChild>
      <button onClick={onSignout} className={cn("hover:text-primary", classes)}>
        {children}
      </button>
    </SheetClose>
  );
}

export default AccountMenu;

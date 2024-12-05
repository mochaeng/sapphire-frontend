import {
  Bell,
  CircleEllipsis,
  CirclePlus,
  CircleUserRound,
  Home,
  MessageSquareText,
  Plus,
} from "lucide-react";

import { SheetTrigger } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import AccountMenu from "./account-menu";
import { buttonClasses, cn, focusVisibleClasses } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";

const iconSize = 33;

function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { user } = useAuthUser();

  return (
    <header
      {...props}
      id="header"
      className={cn(
        "fixed bottom-0 z-20 order-2 h-header w-full text-[19px] md:sticky md:top-0 md:order-[0] md:h-[100dvh] md:w-16 md:max-w-[280px] md:justify-start md:p-0 lg:w-20 xl:w-[17.5rem]",
        className,
      )}
    >
      <nav className="h-full w-full">
        <ul className="flex h-full w-full items-center justify-between border-t-1 border-[#8a96a3]/25 bg-background px-4 py-0 md:flex-col md:justify-start md:gap-4 md:border-r-1 md:border-t-0 md:px-2 md:py-4 xl:items-start">
          <div className="flex w-full items-center justify-between gap-3 px-2 md:flex-col xl:items-start">
            <li className="hidden md:block md:w-full">
              <AccountMenu className="hidden md:block">
                <AccountTriggerButton className="hover:bg-background">
                  <Avatar className="hidden size-10 items-center justify-center hover:border-2 hover:border-primaryOnly md:flex">
                    {user.isAuthenticated ? (
                      <>
                        <AvatarImage
                          src="https://github.com/naesamo.png "
                          className="object-contain"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </>
                    ) : (
                      <CircleUserRound className="!size-10" size={iconSize} />
                    )}
                  </Avatar>
                </AccountTriggerButton>
              </AccountMenu>
            </li>
            <IconButton href="/" name="Home">
              <Home size={iconSize} />
            </IconButton>
            {user.isAuthenticated && (
              <IconButton href="/my/notifications" name="Notifications">
                <Bell size={iconSize} />
              </IconButton>
            )}
            {user.isAuthenticated && (
              <IconButton
                href="/posts/create"
                name="NEW POST"
                className="md:hidden"
              >
                <CirclePlus size={iconSize} />
              </IconButton>
            )}
            {user.isAuthenticated && (
              <IconButton href="/my/messages" name="Messages">
                <MessageSquareText size={iconSize} />
              </IconButton>
            )}
            {user.isAuthenticated && (
              <IconButton
                href="/hutao"
                name="My profile"
                className="hidden md:flex"
              >
                <CircleUserRound size={iconSize} />
              </IconButton>
            )}
            <li className="hidden md:block md:w-full">
              <AccountMenu>
                <AccountTriggerButton>
                  <CircleEllipsis className="!h-[33px] !w-[33px]" />
                  <span className="hidden text-[19px] xl:block">More</span>
                </AccountTriggerButton>
              </AccountMenu>
            </li>
            <li className="md:hidden md:w-full">
              <AccountMenu>
                <AccountTriggerButton className="hover:bg-background">
                  <Avatar className="size-10 md:hidden">
                    <AvatarImage
                      src="https://github.com/naesamo.png "
                      className="object-contain"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </AccountTriggerButton>
              </AccountMenu>
            </li>
          </div>
          <li className="hidden md:inline-flex md:w-full md:justify-center">
            <NewPostButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}

function AccountTriggerButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <SheetTrigger asChild>
      <Button
        className={cn(
          "bg-background hover:bg-secondary hover:text-primary",
          buttonClasses,
          focusVisibleClasses,
          className,
        )}
      >
        {children}
      </Button>
    </SheetTrigger>
  );
}

function IconButton({
  href,
  children,
  name,
  className,
}: {
  href: string;
  children: React.ReactNode;
  name: string;
  className?: string;
}) {
  return (
    <li className={cn("md:w-full", className)}>
      <NavLink
        to={href}
        className={({ isActive }) =>
          cn(
            "flex items-center justify-center gap-4 rounded-xl py-[8px] text-secondaryOnly hover:bg-secondary hover:text-primary md:h-full md:w-full md:justify-center xl:justify-start",
            className,
            // focusClasses,
            focusVisibleClasses,
            { "text-primaryOnly": isActive },
          )
        }
        end
      >
        {children}
        <span className="hidden xl:block">{name}</span>
      </NavLink>
    </li>
  );
}

function NewPostButton() {
  return (
    <NavLink
      to="/posts/create"
      className={cn(
        "hidden rounded-full bg-primary p-4 text-sm text-white hover:bg-blue-800 md:flex md:size-12 md:items-center md:justify-center xl:w-full xl:justify-start",
        focusVisibleClasses,
      )}
    >
      <div className="relative flex items-center justify-center gap-4 text-center xl:w-full xl:justify-start">
        <Plus size={24} />
        <span className="hidden font-semibold xl:absolute xl:left-0 xl:right-0 xl:flex xl:w-full xl:justify-center xl:text-sm xl:text-white">
          NEW POST
        </span>
      </div>
    </NavLink>
  );
}

export default Header;

import {
  Bell,
  CircleEllipsis,
  CirclePlus,
  CircleUserRound,
  Home,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import AccountMenu from "./accountMenu";
import {
  buttonClasses,
  cn,
  focusClasses,
  focusVisibleClasses,
} from "@/lib/utils";
import { Button } from "./ui/button";

const iconSize = 33;

function Header() {
  return (
    <header className="fixed bottom-0 z-20 order-2 h-header w-full text-[19px] md:sticky md:left-0 md:top-0 md:order-[0] md:h-[100dvh] md:w-16 md:justify-start md:p-0 lg:w-20 xl:w-[17.5rem]">
      <nav className="h-full w-full">
        <ul className="flex h-full w-full items-center justify-between border-t-2 border-border bg-white px-4 py-0 md:flex-col md:justify-start md:gap-4 md:border-r-2 md:border-t-0 md:px-2 md:py-4 xl:items-start">
          <div className="flex w-full items-center justify-between gap-3 px-2 md:flex-col xl:items-start">
            <li className="hidden md:block md:w-full">
              <AccountMenu className="hidden md:block">
                <Button
                  className={cn(
                    "hover:bg-transparent",
                    buttonClasses,
                    focusVisibleClasses,
                  )}
                >
                  <Avatar className="hidden size-12 md:block">
                    <AvatarImage
                      src="https://github.com/naesamo.png "
                      className="object-contain"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </AccountMenu>
            </li>
            <IconButton href="/" name="Home">
              <Home size={iconSize} />
            </IconButton>
            <IconButton href="/my/notifications" name="Notifications">
              <Bell size={iconSize} />
            </IconButton>
            <IconButton
              href="/posts/create"
              name="NEW POST"
              className="md:hidden"
            >
              <CirclePlus size={iconSize} />
            </IconButton>
            <IconButton href="/my/messages" name="Messages">
              <MessageSquareText size={iconSize} />
            </IconButton>
            <IconButton
              href="/hutao"
              name="My profile"
              className="hidden md:flex"
            >
              <CircleUserRound size={iconSize} />
            </IconButton>
            <li className="hidden md:block md:w-full">
              <AccountMenu>
                <button
                  className={cn(
                    "hover:bg-secondary hover:text-primary",
                    buttonClasses,
                    focusVisibleClasses,
                  )}
                >
                  <CircleEllipsis className="!h-[33px] !w-[33px]" />
                  <span className="hidden text-[19px] xl:block">More</span>
                </button>
              </AccountMenu>
            </li>
            <li className="md:hidden md:w-full">
              <AccountMenu>
                <Button className={cn(buttonClasses, focusVisibleClasses)}>
                  <Avatar className="size-10">
                    <AvatarImage
                      src="https://github.com/naesamo.png "
                      className="object-contain"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
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
            "flex items-center justify-center gap-4 rounded-xl py-[8px] text-secondaryOnly hover:bg-primary-foreground hover:text-primary md:h-full md:w-full md:justify-center xl:justify-start",
            className,
            focusClasses,
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

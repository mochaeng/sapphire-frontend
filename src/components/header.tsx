import {
  Bell,
  CirclePlus,
  CircleUserRound,
  Home,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import AccountMenu from "./accountMenu";
import { cn } from "@/lib/utils";

const iconSize = 33;

function Header() {
  return (
    <header className="fixed bottom-0 z-20 order-2 h-header w-full text-[19px] md:sticky md:left-0 md:top-0 md:order-[0] md:h-[100dvh] md:w-16 md:justify-start md:p-0 lg:w-20 xl:w-[17.5rem]">
      <nav className="h-full w-full">
        <ul className="flex h-full w-full items-center justify-between border-t-2 border-border bg-white px-4 py-0 md:flex-col md:justify-start md:gap-4 md:border-r-2 md:border-t-0 md:px-2 md:py-4 xl:items-start xl:py-4">
          <Avatar className="hidden size-12 md:block">
            <AvatarImage
              src="https://github.com/naesamo.png "
              className="object-contain"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <HeaderIconButton href="/" name="Home">
            <Home size={iconSize} />
          </HeaderIconButton>
          <HeaderIconButton href="/my/notifications" name="Notifications">
            <Bell size={iconSize} />
          </HeaderIconButton>
          <HeaderIconButton
            href="/posts/create"
            name="NEW POST"
            className="md:hidden"
          >
            <CirclePlus size={iconSize} />
          </HeaderIconButton>
          <HeaderIconButton href="/my/messages" name="Messages">
            <MessageSquareText size={iconSize} />
          </HeaderIconButton>
          <HeaderIconButton href="/hutao" name="My profile">
            <CircleUserRound size={iconSize} />
          </HeaderIconButton>
          <li className="md:w-full">
            <AccountMenu />
          </li>
          <li className="hidden md:inline-flex md:w-full">
            <HeaderIconMediumSize />
          </li>
        </ul>
      </nav>
    </header>
  );
}

function HeaderIconButton({
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
            "flex items-center justify-center gap-4 rounded-xl py-[6px] text-secondaryOnly hover:bg-primary-foreground hover:text-primary focus:bg-primary-foreground focus:text-primary md:h-full md:w-full md:justify-center xl:justify-start",
            className,
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

function HeaderIconMediumSize() {
  return (
    <NavLink
      to="/posts/create"
      className="p2 hidden rounded-xl bg-primary px-2 py-4 text-sm text-white hover:bg-blue-800 md:flex md:h-full md:w-full xl:justify-start"
    >
      <div className="relative flex w-full items-center justify-center gap-4 text-center xl:justify-start">
        <Plus size={24} />
        <span className="hidden font-semibold xl:absolute xl:left-0 xl:right-0 xl:flex xl:w-full xl:justify-center xl:text-sm xl:text-white">
          NEW POST
        </span>
      </div>
    </NavLink>
  );
}

export default Header;

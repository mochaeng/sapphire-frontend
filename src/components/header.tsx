import {
  Bell,
  CirclePlus,
  CircleUserRound,
  Home,
  MessageSquareText,
  Plus,
  Settings,
} from "lucide-react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function IconButton({
  href,
  children,
  name,
  className,
}: {
  href: string;
  children: ReactNode;
  name: string;
  className?: string;
}) {
  return (
    <li className={cn("md:w-full", className)}>
      <a
        href={href}
        className={cn(
          "flex items-center justify-center gap-4 rounded-xl p-1 text-secondaryOnly hover:bg-primary-foreground hover:text-primary md:h-full md:w-full md:justify-center xl:justify-start",
          className,
        )}
      >
        {children}
        <span className="hidden xl:block">{name}</span>
      </a>
    </li>
  );
}

export default function Header() {
  return (
    <header className="fixed bottom-0 z-20 order-2 h-header w-full text-lg md:sticky md:left-0 md:top-0 md:order-[0] md:h-[100dvh] md:w-16 md:justify-start md:p-0 lg:w-20 xl:w-[17.5rem]">
      <nav className="h-full w-full">
        <ul className="flex h-full w-full items-center justify-between border-t-2 border-border bg-white px-4 py-0 md:flex-col md:justify-start md:gap-4 md:border-r-2 md:border-t-0 md:px-2 md:py-4 xl:items-start xl:px-8 xl:py-4">
          <Avatar className="hidden size-12 md:block">
            <AvatarImage
              src="https://github.com/naesamo.png "
              className="object-contain"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <IconButton href="/" name="Home">
            <Home size={30} />
          </IconButton>
          <IconButton href="/" name="Notifications">
            <Bell size={30} />
          </IconButton>
          <IconButton href="/" name="NEW POST" className="md:hidden">
            <CirclePlus size={30} />
          </IconButton>
          <IconButton href="/" name="Messages">
            <MessageSquareText size={30} />
          </IconButton>
          <IconButton href="/" name="My profile">
            <CircleUserRound size={30} />
          </IconButton>
          <IconButton href="/" name="More" className="hidden md:inline-flex">
            <Settings size={30} />
          </IconButton>
          <li className="hidden md:inline-flex md:w-full">
            <a
              href="/"
              className="hidden rounded-xl bg-primary p-2 text-sm text-white hover:bg-blue-800 md:flex md:h-full md:w-full xl:justify-start"
            >
              <div className="relative flex w-full items-center justify-center gap-4 text-center xl:justify-start">
                <Plus size={24} />
                <span className="hidden xl:absolute xl:left-0 xl:right-0 xl:flex xl:w-full xl:justify-center xl:text-sm xl:text-white">
                  NEW POST
                </span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

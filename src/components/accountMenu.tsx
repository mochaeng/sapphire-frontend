import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderIconButton from "./headerIconButton";
import { CircleEllipsis, CircleUserRound, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

function AccountMenu() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center justify-center gap-4 rounded-xl bg-white px-0 py-[6px] text-secondaryOnly shadow-none hover:bg-primary-foreground hover:text-primary md:h-full md:w-full md:justify-center xl:justify-start">
            <CircleEllipsis className="!h-[33px] !w-[33px]" />
            <span className="hidden text-[19px] xl:block">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -left-5 -top-52 w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Collections</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AccountMenu;

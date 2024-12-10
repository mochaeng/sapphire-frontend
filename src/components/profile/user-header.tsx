import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Image,
  UsersRound,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { UserProfileInfo } from "@/lib/types";
import { useNavigate } from "react-router-dom";

function BannerStats({
  numbers,
  children,
  className,
  ...props
}: {
  numbers: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={cn("flex items-center gap-2", className)}>
      {children}
      {numbers}
    </span>
  );
}

function UserHeader({ profile }: { profile: UserProfileInfo }) {
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [isStyckyHeader, setIsStyckyHeader] = useState(false);
  const navigate = useNavigate();

  const fullName = `${profile.firstName} ${profile.lastName || ""}`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 180) {
        setIsStyckyHeader(true);
      } else {
        setIsStyckyHeader(false);
      }

      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);

  const headerStatsClasses = `after:-right-3 after:opacity-90 after:content-['\\2022']`;

  return (
    <div
      className={cn(
        "sticky -top-14 z-10 -mb-14 flex h-14 w-full items-center justify-between bg-transparent text-profileHeader",
        {
          "top-0 border-b-1 border-[#8a96a3]/25 bg-background text-primaryOnly transition-all ease-in-out":
            isStyckyHeader,
        },
      )}
    >
      <div className="mx-2 flex items-center gap-1">
        <Button
          onClick={() => navigate(-1)}
          className={cn(
            "hover:bg-buttonOverlay h-9 w-9 rounded-full bg-transparent text-profileHeader shadow-none transition-none",
            {
              "hover:bg-primaryOverlay text-primaryOnly hover:text-primary":
                isStyckyHeader,
            },
          )}
        >
          <span className="sr-only">back</span>
          <ArrowLeft className={cn("!size-6")} />
        </Button>
        <div className="flex-1 font-bold">
          <span className="text-sapphire">{fullName}</span>
          <div className={cn("flex gap-2 text-sm", { hidden: isStyckyHeader })}>
            <BannerStats className={headerStatsClasses} numbers={100}>
              <UsersRound size={18} />
            </BannerStats>
            <BannerStats className={headerStatsClasses} numbers={100}>
              <Heart size={18} />
            </BannerStats>
            <BannerStats numbers={100}>
              <Image size={18} />
            </BannerStats>
          </div>
        </div>
      </div>
      <div>
        <Button
          className={cn(
            "hidden rounded-full bg-background shadow-none hover:border hover:border-primary hover:bg-background",
            { block: isStyckyHeader },
          )}
        >
          <ExternalLink className="!size-6 text-primary" />
        </Button>
      </div>
    </div>
  );
}

export default UserHeader;

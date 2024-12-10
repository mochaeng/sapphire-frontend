import { ArrowLeft, ExternalLink, Gem, Image, UsersRound } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileInfo } from "@/lib/api/responses";

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

  const fullName = `${profile.first_name} ${profile?.last_name || ""}`;

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
      <div className="flex items-center gap-3 p-4">
        <Button
          onClick={() => navigate(-1)}
          className={cn(
            "h-9 w-9 rounded-full bg-transparent text-profileHeader shadow-none transition-none hover:bg-buttonOverlay",
            {
              "text-primaryOnly hover:bg-primaryOverlay hover:text-primary":
                isStyckyHeader,
            },
          )}
        >
          <span className="sr-only">back</span>
          <ArrowLeft className={cn("!size-6")} />
        </Button>
        <div className="flex-1 font-bold">
          <span className="text-sapphire">{fullName}</span>
          <div className={cn("flex gap-4 text-sm", { hidden: isStyckyHeader })}>
            <BannerStats numbers={profile.num_followers}>
              <UsersRound size={18} />
            </BannerStats>
            <BannerStats numbers={profile.num_posts}>
              <Gem size={18} />
            </BannerStats>
            <BannerStats numbers={profile.num_media_posts}>
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

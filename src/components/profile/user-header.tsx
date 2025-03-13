import { ArrowLeft, ExternalLink, Gem, Image, UsersRound } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileInfo } from "@/lib/api/responses";

const BannerStats = React.memo(function BannerStats({
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
});

function UserHeader({ profile }: { profile: UserProfileInfo }) {
  const [isStyckyHeader, setIsStyckyHeader] = useState(false);
  const navigate = useNavigate();

  const fullName = `${profile.first_name} ${profile?.last_name || ""}`;

  const lastScrollY = useRef(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrame.current) return;

      animationFrame.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (
          (currentScrollY > 180 && lastScrollY.current <= 180) ||
          (currentScrollY <= 180 && lastScrollY.current > 180)
        ) {
          setIsStyckyHeader(currentScrollY > 180);
        }

        lastScrollY.current = currentScrollY;
        animationFrame.current = undefined;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      className={cn(
        "sticky -top-14 z-10 -mb-14 flex h-14 items-center justify-between bg-transparent text-profileHeader",
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
        <div className="flex-1 font-medium">
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

export default React.memo(UserHeader);

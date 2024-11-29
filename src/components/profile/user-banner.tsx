import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Heart, Image, UsersRound } from "lucide-react";

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

const bannerURL =
  "https://i.pinimg.com/736x/dc/52/7c/dc527c727f6bf1eaa25ca7ea896ad27e.jpg";

function UserBanner() {
  const headerStatsClasses = `after:-right-3 after:opacity-90 after:content-['\\2022']`;

  return (
    <div className="relative">
      <div className="text-profileHeader relative z-10 h-14 bg-transparent">
        <div className="flex items-center gap-1 p-2">
          <Button className="text-profileHeader bg-transparent shadow-none hover:bg-transparent">
            <span className="sr-only">back</span>
            <ArrowLeft className="!size-6" />
          </Button>
          <div className="font-bold">
            <span className="text-sapphire">Aurora Fei-Fei</span>
            <div className="flex gap-2 text-sm">
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
      </div>
      <div className="-mt-14 h-44 after:absolute after:inset-0 after:bg-gradient-to-b after:from-black after:to-secondaryOnly after:bg-[length:100%_144px] after:bg-no-repeat after:opacity-40 after:content-['']">
        <img className="h-full w-full object-cover" src={bannerURL} />
      </div>
    </div>
  );
}

export default UserBanner;

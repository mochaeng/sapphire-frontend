import { ExternalLink, Link, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const profileURL = "https://i.redd.it/n6t768hnhr3e1.png";

function UserInfo() {
  const [isMoreInfo, setIsMoreInfo] = useState(false);

  let descriptionClasses = "line-clamp-3";
  if (isMoreInfo) {
    descriptionClasses = "";
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      <div className="flex items-center justify-between">
        <Avatar className="-mt-12 size-24 border-2 border-background">
          <AvatarImage src={profileURL} className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button className="size-12 rounded-full border border-[#8a96a3]/25 bg-background hover:border hover:border-primary hover:bg-background">
          <ExternalLink className="!size-6 text-primary" />
        </Button>
      </div>
      <div className="flex flex-col">
        <span className="text-sapphire font-bold text-primaryOnly">
          Jurídico Chaeyoung
        </span>
        <span className="text-sm text-secondaryOnly">@aurora</span>
      </div>
      <div className="mt-2">
        <div className={descriptionClasses}>
          <div>
            ✨️ Hi my name is Aurora ✨️
            <br />
            <br />
            Follow me if you:
            <br />
            - hate Lalisa and the whole black-pink stuff 🤮
            <br />
            - loves twice and our queen chaeyoung over anything else
            <br />
            - likes functional programming or software development in general
            <br />
          </div>
          <div className="mt-1 space-y-1 text-sm text-secondaryOnly">
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              On the web
            </span>
            <span className="flex items-center gap-1">
              <Link size={16} />
              <a href="my.website.com" target="_blank">
                my.website.com
              </a>
            </span>
          </div>
        </div>
        <Button
          variant="link"
          className="block p-0 font-bold"
          onClick={() => setIsMoreInfo((prev) => !prev)}
        >
          {isMoreInfo ? "Collapse" : "More"} info
        </Button>
      </div>
    </div>
  );
}

export default UserInfo;

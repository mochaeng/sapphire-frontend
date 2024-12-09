import { ExternalLink, Link, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfileInfo } from "@/lib/types";
import UserDescription from "./user-info-description";
import { useEffect, useRef, useState } from "react";

// const profileURL = "https://i.redd.it/n6t768hnhr3e1.png";
const profileURL = "";

function UserInfo({ profile }: { profile: UserProfileInfo }) {
  const fullName = `${profile.firstName} ${profile.lastName || ""}`;
  const nameAcronym = `${profile.firstName[0].toUpperCase()}${profile.lastName?.[0]?.toUpperCase() || ""}`;

  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      <div className="flex items-center justify-between">
        <UserAvatar nameAcronym={nameAcronym} />
        <Button className="size-12 rounded-full border border-[#8a96a3]/25 bg-background hover:border hover:border-primary hover:bg-background">
          <ExternalLink className="!size-6 text-primary" />
        </Button>
      </div>
      <div className="flex flex-col">
        <span className="text-sapphire font-bold text-primaryOnly">
          {fullName}
        </span>
        <span className="text-sm text-secondaryOnly">@{profile.username}</span>
      </div>
      <UserDescription profile={profile} />
    </div>
  );
}

function UserAvatar({ nameAcronym }: { nameAcronym: string }) {
  return (
    <Avatar className="-mt-12 size-24 border-2 border-background bg-background">
      <AvatarImage src={profileURL} className="object-cover" />
      <AvatarFallback className="bg-secondaryOnlyPlaceholder text-3xl font-bold text-primary">
        {nameAcronym}
      </AvatarFallback>
    </Avatar>
  );
}

function UserDescription({ profile }: { profile: UserProfileInfo }) {
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsClamped(scrollHeight > clientHeight);
    }
  }, []);

  const descriptionClasses = isMoreInfo ? "" : "line-clamp-3";

  return (
    <div className="mt-2">
      <div ref={descriptionRef} className={descriptionClasses}>
        <div>{profile.description}</div>
        <div className="mt-1 space-y-1 text-sm text-secondaryOnly">
          {profile.location && (
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {profile.location}
            </span>
          )}
          {profile.userLink && (
            <span className="flex items-center gap-1">
              <Link size={16} />
              <a href="my.website.com" target="_blank">
                {profile.userLink}
              </a>
            </span>
          )}
        </div>
      </div>
      {isClamped && (
        <Button
          variant="link"
          className="block p-0 font-bold"
          onClick={() => setIsMoreInfo((prev) => !prev)}
        >
          {isMoreInfo ? "Collapse" : "More"} info
        </Button>
      )}
    </div>
  );
}

export default UserInfo;

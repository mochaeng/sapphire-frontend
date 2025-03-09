import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserResponse } from "@/lib/api/responses";

const profileURL = "https://i.redd.it/n6t768hnhr3e1.png";

function HeaderPost({
  createdAt,
  user,
}: {
  createdAt: string;
  user?: UserResponse;
}) {
  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`;

  return (
    <div className="flex gap-2 px-4 text-primaryOnly">
      <Avatar className="size-12 border-2 border-background">
        <AvatarImage src={profileURL} className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium">{fullName}</span>
          <div className="flex items-center gap-2">
            <span className="text-secondaryOnly">{createdAt}</span>
            <button>
              <Ellipsis className="text-secondaryOnly" />
            </button>
          </div>
        </div>
        <div>
          <span className="text-sm text-secondaryOnly">
            {`@${user?.username}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderPost;

import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const profileURL = "https://i.redd.it/n6t768hnhr3e1.png";

function HeaderPost() {
  return (
    <div className="flex gap-2 px-4">
      <Avatar className="size-12 border-2 border-background">
        <AvatarImage src={profileURL} className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold">Jurídico Chaeyoung</span>
          <div className="flex items-center gap-2">
            <span className="text-secondaryOnly">Yesterday</span>
            <button>
              <Ellipsis className="text-secondaryOnly" />
            </button>
          </div>
        </div>
        <div>
          <span className="text-sm text-secondaryOnly">@aurora</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderPost;

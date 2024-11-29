import { Ellipsis, Heart, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const profileURL = "https://i.redd.it/n6t768hnhr3e1.png";

function TextPost() {
  return (
    <div>
      <div className="px-4 pb-2">
        <div className="h-3"></div>
        <div className="flex gap-2">
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
        <div className="mt-2">
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
        </div>
        <div className="mt-4 flex items-center gap-4 text-secondaryOnly">
          <Heart />
          <MessageSquare />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span>25 likes</span>
          <span className="opacity-90">&#8226;</span>
          <span>4 comments</span>
        </div>
      </div>
      <Separator className="bg-secondaryOnly opacity-25" />
    </div>
  );
}

export default TextPost;

import { Heart, MessageSquare } from "lucide-react";

function FooterPost() {
  return (
    <div className="px-4">
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
  );
}

export default FooterPost;

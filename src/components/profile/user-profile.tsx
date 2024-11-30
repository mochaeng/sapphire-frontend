import { Separator } from "@/components/ui/separator";
import UserBanner from "./user-banner";
import UserInfo from "./user-info";
import ContentPost from "../posts/content-post";
import postImageURL from "@/assets/chaeyoung.jpg";

function UserProfile() {
  return (
    <div>
      <UserBanner />
      <UserInfo />
      <Separator className="h-2 border-y-1 border-black bg-secondaryOnly opacity-25" />
      <ContentPost>
        <div className="mt-2">
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
          <div>
            <img className="max-h-post" src={postImageURL} />
          </div>
        </div>
      </ContentPost>
    </div>
  );
}

export default UserProfile;

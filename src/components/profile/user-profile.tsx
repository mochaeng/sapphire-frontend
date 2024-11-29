import { Separator } from "@/components/ui/separator";
import UserBanner from "./user-banner";
import UserInfo from "./user-info";
import TextPost from "../posts/text-post";

function UserProfile() {
  return (
    <div>
      <UserBanner />
      <UserInfo />
      <Separator className="h-2 border-y-1 border-black bg-secondaryOnly opacity-25" />
      <TextPost />
      <TextPost />
      <TextPost />
      <TextPost />
      <TextPost />
      <TextPost />
    </div>
  );
}

export default UserProfile;

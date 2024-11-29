import { Separator } from "@/components/ui/separator";
import UserBanner from "./user-banner";
import UserInfo from "./user-info";

function UserProfile() {
  return (
    <div>
      <UserBanner />
      <UserInfo />
      <Separator className="h-[1.25px] bg-primaryOnly" />
    </div>
  );
}

export default UserProfile;

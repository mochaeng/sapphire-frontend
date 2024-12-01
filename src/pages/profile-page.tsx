import UserProfile from "@/components/profile/user-profile";
import RightSidebar from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";

function ProfilePage() {
  return (
    <div className="flex justify-center pb-headerWithOffset md:pb-0">
      <div className="flex w-full max-w-centerWrapper">
        <UserProfile />
      </div>

      <RightSidebar>
        <span className="text-primaryOnly">Subscription</span>
        <Button>Subscribe</Button>
      </RightSidebar>
    </div>
  );
}

export default ProfilePage;

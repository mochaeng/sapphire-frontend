import UserProfile from "@/components/profile/user-profile";
import { Button } from "@/components/ui/button";

function ProfilePage() {
  return (
    <div className="flex justify-center pb-headerWithOffset md:pb-0">
      <div className="flex w-full max-w-centerWrapper">
        <UserProfile />
      </div>

      <div className="bg-rose hidden lg-2:flex lg-2:w-full lg-2:max-w-rightWrapper lg-2:justify-center">
        <div className="flex h-screen w-full max-w-[378px] flex-col p-4 lg-2:sticky lg-2:top-0">
          <span className="text-primaryOnly">Subscription</span>
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

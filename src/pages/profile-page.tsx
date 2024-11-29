import UserProfile from "@/components/profile/user-profile";
import { Button } from "@/components/ui/button";

function ProfilePage() {
  return (
    <div className="flex">
      <div className="w-full max-w-centerWrapper bg-yellow-50">
        <UserProfile />
      </div>
      <div className="hidden max-w-rightWrapper bg-blue-300 p-2 lg-2:flex lg-2:w-full">
        <div className="flex w-full flex-col gap-2 border border-secondaryOnly bg-green-200 p-4">
          <span>Subscription</span>
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

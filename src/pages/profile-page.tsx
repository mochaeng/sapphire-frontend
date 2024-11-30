import UserProfile from "@/components/profile/user-profile";
import { Button } from "@/components/ui/button";

function ProfilePage() {
  return (
    <div className="flex pb-headerWithOffset md:pb-0">
      <div className="w-full max-w-centerWrapper">
        <UserProfile />
      </div>

      <div className="hidden bg-rose-50 lg-2:flex lg-2:w-full lg-2:max-w-rightWrapper lg-2:justify-center">
        <div className="flex h-10 w-full items-center justify-center bg-white lg-2:sticky lg-2:top-0">
          <button className="text-2xl font-bold text-black">what</button>
        </div>
      </div>

      {/* <div className="hidden max-w-rightWrapper bg-rose-50 lg-2:flex lg-2:w-full lg-2:justify-center">
        <div className="sticky top-4 flex h-28 w-full max-w-[378px] flex-col gap-2 border border-secondaryOnly bg-background p-4">
          <span>Subscription</span>
          <Button>Subscribe</Button>
        </div>
      </div> */}
    </div>
  );
}

export default ProfilePage;

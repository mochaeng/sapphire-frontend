import { Separator } from "@/components/ui/separator";
import UserBanner from "./user-banner";
import UserInfo from "./user-info";
import ContentPost from "../posts/content-post";
import postImageURL from "@/assets/chaeyoung.jpg";
import postImageURL2 from "@/assets/twice.jpg";
import TextPost from "../posts/text-post";
import ImagePost from "../posts/image-post";
import UserHeader from "./user-header";
import { UserProfileInfo } from "@/lib/api/responses";

function UserProfile({ profile }: { profile: UserProfileInfo }) {
  return (
    <div className="border-r-1 border-[#8a96a3]/25">
      <UserHeader profile={profile} />
      <UserBanner />
      <UserInfo profile={profile} />
      <Separator className="h-2 border-y-1 border-black bg-secondaryOnly opacity-25" />

      {/* <ContentPost>
        <TextPost>
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
        </TextPost>
        <ImagePost src={postImageURL} alt="chaeyoung from twice kpop group" />
      </ContentPost> */}

      <ContentPost>
        <TextPost>
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
        </TextPost>
        <ImagePost src={postImageURL2} alt="chaeyoung from twice kpop group" />
      </ContentPost>
      <ContentPost>
        <TextPost>
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
        </TextPost>
        <ImagePost src={postImageURL2} alt="chaeyoung from twice kpop group" />
      </ContentPost>
      <ContentPost>
        <TextPost>
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
        </TextPost>
        <ImagePost src={postImageURL2} alt="chaeyoung from twice kpop group" />
      </ContentPost>
    </div>
  );
}

export default UserProfile;

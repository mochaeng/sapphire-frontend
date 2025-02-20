import ContentPost from "../posts/content-post";
import ImagePost from "../posts/image-post";
import TextPost from "../posts/text-post";
import RightSidebar from "../right-sidebar";
import { Button } from "../ui/button";
import postImageURL2 from "@/assets/twice.jpg";
import TimelineHeader from "./timeline-header";

function TimelinePanel() {
  return (
    <div className="flex">
      <div className="flex w-full max-w-centerWrapper flex-col">
        <TimelineHeader />
        {Array.from({ length: 3 }).map((_, i) => (
          <ContentPost key={i}>
            <TextPost>
              This is going to be so special week with Thanksgiving and black
              Friday coming up 😊🚀✨
            </TextPost>
            <ImagePost
              src={postImageURL2}
              alt="chaeyoung from twice kpop group"
            />
          </ContentPost>
        ))}
      </div>

      <RightSidebar>
        <span className="text-primaryOnly">Subscription</span>
        <Button>Subscribe</Button>
      </RightSidebar>
    </div>
    // <div className="flex w-full max-w-screen-xl justify-center">
    //   <Header />
    //   <div className="flex w-full max-w-[1016px]">
    //     <div className="h-2 w-full bg-rose-600"></div>
    //   </div>
    // </div>
  );
}

export default TimelinePanel;

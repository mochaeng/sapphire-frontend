import ContentPost from "../posts/content-post";
import ImagePost from "../posts/image-post";
import TextPost from "../posts/text-post";
import RightSidebar from "../right-sidebar";
import { Button } from "../ui/button";
import postImageURL2 from "@/assets/twice.jpg";
import TimelineHeader from "./timeline-header";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../create/create-post-form";

function TimelinePanel() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/posts/create", { state: { autofocus: true } });
  };

  return (
    <div className="flex">
      <div className="flex w-full max-w-centerWrapper flex-col">
        <TimelineHeader />

        <CreatePostForm onClick={handleClick} />

        {/* <div onClick={handleClick} className="cursor-pointer">
          <Textarea
            placeholder="What's happening?"
            readOnly
            className="bg-gray-100"
          />
        </div> */}

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

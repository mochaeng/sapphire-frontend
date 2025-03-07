import ContentPost from "../posts/content-post";
import TextPost from "../posts/text-post";
import RightSidebar from "../right-sidebar";
import { Button } from "../ui/button";
import postImageURL2 from "@/assets/twice.jpg";
import TimelineHeader from "./timeline-header";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../create/create-post-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostFormSchema } from "@/lib/posts-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import MediaPost from "../posts/media-post";

function TimelinePanel() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    mode: "onBlur",
    defaultValues: {
      content: "",
      media: null,
      tags: [],
    },
  });

  const handleClick = () => {
    navigate("/posts/create", { state: { autofocus: true } });
  };

  return (
    <div className="flex">
      <div className="flex w-full max-w-centerWrapper flex-col">
        <TimelineHeader />

        <CreatePostForm form={form} onClick={handleClick} />

        {Array.from({ length: 3 }).map((_, i) => (
          <ContentPost key={i}>
            <TextPost>
              This is going to be so special week with Thanksgiving and black
              Friday coming up 😊🚀✨
            </TextPost>
            <MediaPost
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

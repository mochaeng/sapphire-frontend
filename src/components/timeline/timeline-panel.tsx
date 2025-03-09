import ContentPost from "../posts/content-post";
import TextPost from "../posts/text-post";
import RightSidebar from "../right-sidebar";
import { Button } from "../ui/button";
import TimelineHeader from "./timeline-header";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../create/create-post-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostFormSchema } from "@/lib/posts-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import MediaPost from "../posts/media-post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserFeed } from "@/lib/api/posts";
import { GetUserFeedResponse } from "@/lib/api/responses";
import { useEffect } from "react";
import { API_URL } from "@/lib/api/utils";

function TimelinePanel() {
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["userFeed"],
    queryFn: ({ pageParam }) => fetchUserFeed(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage: GetUserFeedResponse) =>
      lastPage.next_cursor || undefined,
  });

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

  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
    const loadMoreTrigger = document.getElementById("load-more-trigger");

    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }

    return () => {
      if (loadMoreTrigger) {
        observer.unobserve(loadMoreTrigger);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex">
      <div className="flex w-full max-w-centerWrapper flex-col">
        <TimelineHeader />

        <CreatePostForm form={form} onClick={handleClick} />

        {status === "pending" && (
          <div className="p-4 text-center">Loading posts...</div>
        )}

        {status === "error" && (
          <div className="p-4 text-center text-red-500">
            Error loading posts: {error?.message || "Unknow error"}
          </div>
        )}

        {status === "success" &&
          data.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.posts.map((post) => (
                <ContentPost key={post.id} post={post} user={post.user}>
                  <TextPost>{post.content}</TextPost>
                  {post.media_url && (
                    <MediaPost
                      src={`${API_URL}/${post.media_url}`}
                      alt="image for the post"
                    />
                  )}
                </ContentPost>
              ))}
            </div>
          ))}

        <div id="load-more-trigger" className="h-10 w-full"></div>
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

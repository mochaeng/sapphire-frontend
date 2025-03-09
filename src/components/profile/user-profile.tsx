import { Separator } from "@/components/ui/separator";
import UserBanner from "./user-banner";
import UserInfo from "./user-info";
import ContentPost from "../posts/content-post";
import TextPost from "../posts/text-post";
import UserHeader from "./user-header";
import { GetUserPostsResponse, UserProfileInfo } from "@/lib/api/responses";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "@/lib/api/posts";
import { useEffect } from "react";
import { API_URL } from "@/lib/api/utils";
import MediaPost from "../posts/media-post";

function UserProfile({ profile }: { profile: UserProfileInfo }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["userPosts", profile.username],
    queryFn: ({ pageParam }) => fetchUserPosts(profile.username, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage: GetUserPostsResponse) =>
      lastPage.next_cursor || undefined,
  });

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
    <div className="w-full border-r-1 border-[#8a96a3]/25">
      <UserHeader profile={profile} />
      <UserBanner />
      <UserInfo profile={profile} />
      <Separator className="h-2 border-y-1 border-black bg-secondaryOnly opacity-25" />

      {status === "pending" && (
        <div className="p-4 text-center">Loading posts...</div>
      )}

      {status === "error" && (
        <div className="p-4 text-center text-red-500">
          Error loading posts: {error?.message || "Unkown error"}
        </div>
      )}

      {status === "success" &&
        data.pages.map((page, pageInedx) => (
          <div key={pageInedx}>
            {page.posts.map((post) => (
              <ContentPost key={post.id} user={page.user} post={post}>
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

      {isFetchingNextPage && (
        <div className="p-4 text-center">Loading more posts...</div>
      )}

      <div id="load-more-trigger" className="h-10 w-full"></div>

      {/* <ContentPost>
        <TextPost>
          This is going to be so special week with Thanksgiving and black friday
          coming up 😊🚀✨
        </TextPost>
        <ImagePost src={postImageURL2} alt="chaeyoung from twice kpop group" />
      </ContentPost> */}
    </div>
  );
}

export default UserProfile;

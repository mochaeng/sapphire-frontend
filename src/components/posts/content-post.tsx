import { Separator } from "../ui/separator";
import HeaderPost from "./header-post";
import FooterPost from "./footer-post";
import { UserPosts, UserResponse } from "@/lib/api/responses";

function ContentPost({
  post,
  user,
  children,
  ...props
}: {
  post?: UserPosts;
  user?: UserResponse;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-full" {...props}>
      <div className="pb-3 text-primaryOnly">
        <div className="h-3"></div>
        <HeaderPost createdAt={post?.created_at || ""} user={user} />
        <div className="mt-3">{children}</div>
        <FooterPost />
      </div>
      <Separator className="bg-secondaryOnly opacity-25" />
    </div>
  );
}

export default ContentPost;

import { Separator } from "../ui/separator";
import HeaderPost from "./header-post";
import FooterPost from "./footer-post";

function ContentPost({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="pb-3 text-primaryOnly">
        <div className="h-3"></div>
        <HeaderPost />
        <div className="mt-3">{children}</div>
        <FooterPost />
      </div>
      <Separator className="bg-secondaryOnly opacity-25" />
    </div>
  );
}

export default ContentPost;

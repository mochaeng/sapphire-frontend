import { Separator } from "../ui/separator";
import HeaderPost from "./header-post";
import FooterPost from "./footer-post";

function ContentPost({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 pb-2">
        <div className="h-3"></div>
        <HeaderPost />
        {children}
        <FooterPost />
      </div>
      <Separator className="bg-secondaryOnly opacity-25" />
    </div>
  );
}

export default ContentPost;

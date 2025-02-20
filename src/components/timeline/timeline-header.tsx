import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

function TimelineHeader() {
  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b-1 border-[#8a96a3]/25 bg-background p-4 text-profileHeader">
      <span className="text-[19px] font-medium text-primaryOnly">HOME</span>
      <Button className="h-9 w-9 rounded-full border-none bg-transparent text-primaryOnly shadow-none hover:bg-secondary hover:text-primary">
        <EllipsisVertical className="!size-5" />
      </Button>
    </div>
  );
}

export default TimelineHeader;

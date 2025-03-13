import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import PageHeader from "../page-header";

function TimelineHeader() {
  return (
    <PageHeader>
      <span className="text-[19px] font-medium text-primaryOnly">HOME</span>
      <Button className="h-9 w-9 rounded-full border-none bg-transparent text-primaryOnly shadow-none hover:bg-secondary hover:text-primary">
        <EllipsisVertical className="!size-5" />
      </Button>
    </PageHeader>
  );
}

export default TimelineHeader;

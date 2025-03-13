import { useNavigate } from "react-router-dom";
import PageHeader from "../page-header";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

function EditProfileHeader() {
  const navigate = useNavigate();
  return (
    <PageHeader>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate(-1)}
          className={cn(
            "h-9 w-9 rounded-full bg-transparent text-primaryOnly shadow-none transition-none hover:bg-buttonOverlay",
          )}
        >
          <span className="sr-only">back</span>
          <ArrowLeft className={cn("!size-6")} />
        </Button>
        <span className="text-[19px] font-medium text-primaryOnly">
          EDIT PROFILE
        </span>
      </div>
      <Button className="rounded-full">SAVE</Button>
    </PageHeader>
  );
}

export default EditProfileHeader;

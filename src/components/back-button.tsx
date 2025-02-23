import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

function BackButton({
  className,
  ...rest
}: React.HTMLAttributes<HTMLButtonElement>) {
  const navigate = useNavigate();

  return (
    <Button
      {...rest}
      onClick={() => navigate(-1)}
      className={cn(
        "h-9 w-9 rounded-full bg-transparent text-primaryOnly shadow-none transition-none hover:bg-primaryOverlay hover:text-primary",
        className,
      )}
    >
      <span className="sr-only">back</span>
      <ArrowLeft className={cn("!size-6")} />
    </Button>
  );
}

export default BackButton;

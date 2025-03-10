import { createPostFormSchema } from "@/lib/posts-validation";
import BackButton from "../back-button";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

function CreateHeader({
  form,
  onSubmit,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof createPostFormSchema>>;
  onSubmit: (values: z.infer<typeof createPostFormSchema>) => void;
  isPending: boolean;
}) {
  const content = form.watch("content");

  const hasContent = content.trim().length > 0;
  const isDisable = !hasContent || isPending;

  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between gap-2 border-b-1 border-[#8a96a3]/25 bg-background px-4 text-profileHeader">
      <div className="flex items-center gap-2">
        <BackButton />
        <span className="text-[19px] font-medium text-primaryOnly">
          NEW POST
        </span>
      </div>

      <button
        type="submit"
        disabled={isDisable}
        className={cn(
          "rounded-full bg-secondaryOnly px-4 py-2 text-small font-medium opacity-30",
          { "bg-primary opacity-100": !isDisable },
        )}
        onClick={form.handleSubmit(onSubmit)}
      >
        {isPending ? "POSTING..." : "POST"}
      </button>
    </div>
  );
}

export default CreateHeader;

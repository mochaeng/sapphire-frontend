import { createPostFormSchema } from "@/lib/posts-validation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AutoResizeTextarea } from "../autoresize-textarea";
import { Film, Image } from "lucide-react";
import { AddMediaButton, ImageMediaButton } from "./add-media-button";
import MediaFormVisualizer from "./media-form-visualizer";
import useCreatePostFormStore from "@/store/create-post-form-store";

const MaxPostsLimits = 1;

function CreatePostForm({
  form,
  disableMediaButtons,
  isPending,
  ...props
}: {
  form: UseFormReturn<z.infer<typeof createPostFormSchema>>;
  disableMediaButtons: boolean;
  isPending: boolean;
} & React.HTMLAttributes<HTMLFormElement>) {
  const location = useLocation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { files, setFiles } = useCreatePostFormStore();
  const isDisable =
    files.length >= MaxPostsLimits || disableMediaButtons || isPending;

  const handleAddFile = (type: "image" | "video") => {
    if (files.length < MaxPostsLimits && fileInputRef.current) {
      fileInputRef.current.accept = type === "video" ? "video/*" : "image/*";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newFile = e.target.files?.[0];
    if (newFile) {
      const newFiles = [...files, newFile];
      setFiles(newFiles);
      form?.setValue("media", newFiles);
    }
    e.target.value = "";
  };

  useEffect(() => {
    if (location.state?.autofocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  });

  const removeFileHandle = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    form?.setValue("media", newFiles);
  };

  return (
    <Form {...form}>
      <form
        className="border-b-1 border-[#8a96a3]/25"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
        {...props}
      >
        <FormField
          control={form?.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoResizeTextarea
                  {...field}
                  ref={textAreaRef}
                  className="scrollbar overflow-y-auto rounded-none border-none p-4 !text-mid shadow-none transition duration-200 placeholder:transition-all focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus:placeholder:opacity-40"
                  placeholder="Compose new post..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MediaFormVisualizer onRemoveFile={removeFileHandle} files={files} />

        <div className="flex items-center gap-2 px-4 py-1 text-secondaryOnly">
          <AddMediaButton
            disabled={isDisable}
            onClick={() => handleAddFile("image")}
          >
            <ImageMediaButton Icon={Image} disableMediaButtons />
          </AddMediaButton>
          <AddMediaButton
            disabled={isDisable}
            onClick={() => handleAddFile("video")}
          >
            <ImageMediaButton Icon={Film} disableMediaButtons />
          </AddMediaButton>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </form>
    </Form>
  );
}

export default CreatePostForm;

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
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AutoResizeTextarea } from "../autoresize-textarea";
import { Film, Image } from "lucide-react";
import AddMediaButton from "./add-media-button";

function CreatePostForm({
  form,
  ...props
}: {
  form: UseFormReturn<z.infer<typeof createPostFormSchema>>;
} & React.HTMLAttributes<HTMLFormElement>) {
  const location = useLocation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFile = (type: "image" | "video") => {
    if (files.length < 4 && fileInputRef.current) {
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

        <div className="flex gap-2 px-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`upload-${index}`}
                  className="h-16 w-16 rounded object-cover"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="h-16 w-16 rounded object-cover"
                  controls
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-1 text-secondaryOnly">
          <AddMediaButton onClick={() => handleAddFile("image")}>
            <Image
              size={22}
              className="hover:bg-secondary hover:text-primary"
            />
          </AddMediaButton>
          <AddMediaButton onClick={() => handleAddFile("video")}>
            <Film size={22} className="hover:bg-secondary hover:text-primary" />
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

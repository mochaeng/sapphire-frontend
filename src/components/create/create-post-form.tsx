import { createPostFormSchema } from "@/lib/posts-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { PostCreatePayload } from "@/lib/api/payloads";
import { fetchCreatePost } from "@/lib/api/posts";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
import { AutoResizeTextarea } from "../autoresize-textarea";

function CreatePostForm({ ...props }: React.HTMLAttributes<HTMLFormElement>) {
  const location = useLocation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreatePost,
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    mode: "onBlur",
    defaultValues: {
      content: "",
      media: null,
      tags: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof createPostFormSchema>) => {
    const payload: PostCreatePayload = {
      content: values.content,
      media: values.media,
      tags: values.tags,
    };
    mutate(payload);
  };

  useEffect(() => {
    if (location.state?.autofocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  });

  return (
    <Form {...form}>
      <form
        className=""
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoResizeTextarea
                  {...field}
                  ref={textAreaRef}
                  className="rounded-none px-4"
                  placeholder="Compose"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  accept="image/*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tags separated by commas"
                  onChange={(e) => {
                    const value = e.target.value;
                    const tagsArray = value
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0);
                    field.onChange(tagsArray);
                  }}
                />
              </FormControl>
              <FormDescription>
                Separate tags with commas (e.g., react, javascript)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? "Submitting..." : "Post"}
        </Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;

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
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PostCreatePayload } from "@/lib/api/payloads";
import { fetchCreatePost } from "@/lib/api/posts";
import { Button } from "../ui/button";

function CreatePostForm() {
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [showTagsInput, setShowTagsInput] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreatePost,
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (values: z.infer<typeof createPostFormSchema>) => {
    console.log("hello");
    const payload: PostCreatePayload = {
      content: values.content,
      media: values.media,
      tags: values.tags,
    };
    mutate(payload);
  };

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    mode: "onBlur",
    defaultValues: {
      content: "",
      media: null,
      tags: [],
    },
  });

  return (
    <Form {...form}>
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Textarea {...field} placeholder="Write your post..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Buttons to toggle additional fields */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowMediaInput((prev) => !prev)}
            className="rounded border px-3 py-1"
          >
            {showMediaInput ? "Cancel Image" : "Add Image"}
          </button>
          <button
            type="button"
            onClick={() => setShowTagsInput((prev) => !prev)}
            className="rounded border px-3 py-1"
          >
            {showTagsInput ? "Cancel Tags" : "Add Tags"}
          </button>
        </div>

        {showMediaInput && (
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
        )}

        {showTagsInput && (
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
        )}

        <Button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? "Submitting..." : "Post"}
        </Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;

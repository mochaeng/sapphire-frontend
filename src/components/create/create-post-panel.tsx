import { fetchCreatePost } from "@/lib/api/posts";
import CreatePostForm from "./create-post-form";
import CreateHeader from "./create-post-header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createPostFormSchema } from "@/lib/posts-validation";
import { PostCreatePayload } from "@/lib/api/payloads";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreatePostFormStore from "@/store/create-post-form-store";
import React from "react";

export const CreatePanel = React.memo(function CreatePanel() {
  const queryClient = useQueryClient();
  const setFiles = useCreatePostFormStore((state) => state.setFiles);

  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFeed"] });
      form.reset({ content: "", media: null, tags: [] });
      setFiles([]);
      // navigate("/", { replace: true, state: { newPost: true } });
    },
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

  return (
    <div className="w-full">
      <CreateHeader form={form} onSubmit={onSubmit} isPending={isPending} />
      <CreatePostForm
        isPending={isPending}
        disableMediaButtons={false}
        form={form}
      />
    </div>
  );
});

export default CreatePanel;

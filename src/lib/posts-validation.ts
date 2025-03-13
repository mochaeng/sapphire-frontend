import { z } from "zod";

export const createPostFormSchema = z.object({
  content: z.string().min(1, ""),
  media: z.any().optional(),
  tags: z.array(z.string()),
});

export const editProfileFormSchema = z.object({
  profileImage: z.any().optional(),
  bannerImage: z.any().optional(),
  username: z.string(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
});

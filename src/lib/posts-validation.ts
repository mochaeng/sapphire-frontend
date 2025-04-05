import { z } from "zod";
import { UsernameValidation } from "./validations";

export const createPostFormSchema = z.object({
  content: z.string().min(1, ""),
  media: z.any().optional(),
  tags: z.array(z.string()),
});

export const EditProfileFormMaxLengths = {
  bio: 300,
  location: 64,
  website: 100,
};

export const editProfileFormSchema = z.object({
  profileImage: z.any().optional(),
  bannerImage: z.any().optional(),
  username: UsernameValidation,
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
});

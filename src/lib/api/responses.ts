import { z } from "zod";

export const AuthMeResponseSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string().optional(),
  role_name: z.string(),
});

export const UserProfileResponseSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string().optional(),
  description: z.string().optional(),
  banner_url: z.string().optional(),
  avatar_url: z.string().optional(),
  location: z.string().optional(),
  user_link: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

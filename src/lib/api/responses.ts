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
  num_following: z.number(),
  num_followers: z.number(),
  num_posts: z.number(),
  num_media_posts: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type UserProfileInfo = z.infer<typeof UserProfileResponseSchema>;

const UserPostResponseSchema = z.object({
  id: z.number(),
  tittle: z.string(),
  content: z.string(),
  media_urls: z.string().optional(),
  tags: z.array(z.string()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
  user: z
    .object({
      id: z.number(),
      username: z.string(),
      first_name: z.string(),
      last_name: z.string().optional(),
    })
    .transform((user) => ({
      ...user,
      firstName: user.first_name,
      lastName: user.last_name,
    })),
});
export const UserPostsResponseSchema = z.array(UserPostResponseSchema);
export type UserPosts = z.infer<typeof UserPostsResponseSchema>;

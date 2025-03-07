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

export const UserResponseSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});
export type UserResponse = z.infer<typeof UserResponseSchema>;

export const UserPostsResponseSchema = z.object({
  id: z.number(),
  tittle: z.string().optional(),
  content: z.string(),
  media_url: z.string().optional(),
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
    }))
    .optional(),
});
export type UserPosts = z.infer<typeof UserPostsResponseSchema>;

export const GetUserPostsResponseSchema = z.object({
  posts: z.array(UserPostsResponseSchema),
  user: UserResponseSchema,
  next_cursor: z.string().optional(),
});
export type GetUserPostsResponse = z.infer<typeof GetUserPostsResponseSchema>;

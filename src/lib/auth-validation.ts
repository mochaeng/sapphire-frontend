import { z } from "zod";

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const signupFormSchema = z.object({
  name: z.string().min(2).max(30),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.string().email(),
  password: z.string().min(4),
});

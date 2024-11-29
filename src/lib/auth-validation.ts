import { z } from "zod";

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupFormSchema = z.object({
  name: z.string().min(2).max(30),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string(),
});

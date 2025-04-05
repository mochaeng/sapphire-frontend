import { z } from "zod";
import { NameValidation, UsernameValidation } from "./validations";

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const signupFormSchema = z.object({
  name: NameValidation,
  username: UsernameValidation,
  email: z.string().email(),
  password: z.string().min(4),
});

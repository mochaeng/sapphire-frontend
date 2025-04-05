import { z } from "zod";

export const UsernameValidation = z
  .string()
  .min(3)
  .max(30)
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores",
  );

export const NameValidation = z.string().min(2).max(30);

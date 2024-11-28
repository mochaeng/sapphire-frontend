import { z } from "zod";

export const AuthMeResponseSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string().optional(),
  role_name: z.string(),
});

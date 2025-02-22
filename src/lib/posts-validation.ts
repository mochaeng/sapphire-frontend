import { z } from "zod";

// Define the schema for validation
export const createPostFormSchema = z.object({
  content: z.string().min(1, ""),
  // For file inputs, we accept a FileList; further refinement is possible if needed.
  media: z.any().optional(),
  tags: z.array(z.string()),
});

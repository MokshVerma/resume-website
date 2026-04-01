import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

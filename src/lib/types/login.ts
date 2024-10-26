import { z } from "zod";

export const ZLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginSchema = z.input<typeof ZLoginSchema>;

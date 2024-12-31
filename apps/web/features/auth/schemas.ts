import { z } from "zod"

export const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }).trim(),
  password: z
    .string()
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." })
    .min(6, { message: "Password must be at least 6 characters." })
    .trim(),
});


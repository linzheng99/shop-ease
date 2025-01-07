import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(1, {
    message: "Store name is required",
  }),
  description: z.string().optional(),
})

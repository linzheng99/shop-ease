import { z } from "zod";

export const createSizeSchema = z.object({
  name: z.string().min(1, {
    message: "Size name is required",
  }),
  storeId: z.string().min(1, {
    message: "Store is required",
  }),
})

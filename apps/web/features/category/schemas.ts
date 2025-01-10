import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
  storeId: z.string().min(1, {
    message: "Store is required",
  }),
})

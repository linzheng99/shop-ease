import { z } from "zod";

export const createColorSchema = z.object({
  name: z.string().min(1, {
    message: "Color name is required",
  }),
  value: z.string().min(1, {
    message: "Color value is required",
  }),
  storeId: z.string().min(1, {
    message: "Store is required",
  }),
})

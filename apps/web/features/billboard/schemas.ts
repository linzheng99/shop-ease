import { z } from "zod";

export const createBillboardSchema = z.object({
  label: z.string().min(1, {
    message: "Billboard label is required",
  }),
  imageId: z.string().min(1, {
    message: "Billboard image is required",
  }),
  storeId: z.string().min(1, {
    message: "Billboard store is required",
  }),
})

export const editBillboardSchema = z.object({
  label: z.string().min(1, {
    message: "Billboard label is required",
  }),
  imageId: z.string().min(1, {
    message: "Billboard image is required",
  }),
  storeId: z.string().min(1, {
    message: "Billboard store is required",
  }),
})

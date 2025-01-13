import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "Product name is required",
  }),
  description: z.string().min(1, {
    message: "Product description is required",
  }),
  price: z.number().min(0),
  storeId: z.string().min(1, {
    message: "Product store is required",
  }),
  categoryId: z.string().min(1, {
    message: "Product category is required",
  }),
  images: z.array(z.object({
    id: z.string(),
    url: z.string(),
    name: z.string(),
  })).default([]),
  productVariants: z
    .array(
      z.object({
        colorId: z.string().default(""),
        sizeId: z.string().default(""),
        quantity: z.number().min(1, {
          message: "Product quantity is required",
        }),
      })
    )
    .min(1, {
      message: "Product variant is required",
    }),
});

export const editProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Product name is required",
  }),
  description: z.string().min(1, {
    message: "Product description is required",
  }),
  price: z.number().min(0),
  storeId: z.string().min(1, {
    message: "Product store is required",
  }),
  categoryId: z.string().min(1, {
    message: "Product category is required",
  }),
  images: z.array(z.object({
    id: z.string(),
    url: z.string(),
    name: z.string(),
  })).default([]),
  productVariants: z
    .array(
      z.object({
        id: z.string().optional(),
        colorId: z.string().default(""),
        sizeId: z.string().default(""),
        quantity: z.number().min(1, {
          message: "Product quantity is required",
        }),
      })
    )
    .min(1, {
      message: "Product variant is required",
    }),
});

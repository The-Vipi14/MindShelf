import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  price: z.number().positive(),
  category: z.string().min(2),
  image: z.string().url(),
  description: z.string().min(5),
  pages: z.number().int().positive()
});

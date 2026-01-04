import { z } from "zod";

export const orderStatusSchema = z.object({
  status: z.enum(["Placed", "Shipped", "Delivered", "Cancelled"])
});

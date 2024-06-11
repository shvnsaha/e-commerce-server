import { z } from 'zod'

// Define Zod schema for variant
const variantValidationSchema = z.object({
  type: z.string().min(1).max(20), // Adjust max length as needed
  value: z.string().min(1), // Adjust min length as needed
})

// Define Zod schema for inventory
const inventoryValidationSchema = z.object({
  quantity: z.number().min(1),
  inStock: z.boolean(),
})

// Define Zod schema for product
const productValidationSchema = z.object({
  name: z.string().min(3).max(40).trim(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
})

export default productValidationSchema

import { z } from 'zod'

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Enter Valid Email' }).trim(),
  productId: z.string(),
  price: z
    .number()
    .min(0, { message: 'Order price must be greater than 0' })
    .nonnegative('Order price must be a non-negative number'),
  quantity: z
    .number()
    .min(1, { message: 'Order must have quantity greater than 1' })
    .nonnegative('Quantity must be a non-negative number'),
})

export default orderValidationSchema

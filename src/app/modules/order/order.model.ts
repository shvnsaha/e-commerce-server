import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required for order'],
    trim: true,
  },
  productId: {
    type: String,
    required: [true, 'Order must have an product id'],
  },
  price: {
    type: Number,
    required: [true, 'Order must have price'],
    min: [0, 'Order price must have greater than 0'],
  },
  quantity: {
    type: Number,
    required: [true, 'Order must have quantity greater than 1'],
    min: [1, 'Order must have quantity greater than 1'],
  },
})

export const Order = model<TOrder>('Order', orderSchema)

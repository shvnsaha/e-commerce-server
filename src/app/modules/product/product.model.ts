import { Schema, model } from 'mongoose'
import { TInventory, TProduct, TVariants } from './product.interface'

const variantSchema = new Schema<TVariants>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
)

const inventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      min: [1, 'Quantity must be at least 1'],
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
)

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    min: [3, 'Product name must be at least 3 character'],
    max: [40, 'Product name not more than 40 character'],
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
})

export const Product = model<TProduct>('Product', productSchema)

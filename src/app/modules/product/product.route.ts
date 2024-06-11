import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

router
  .route('/')
  .post(ProductControllers.createProduct)
  .get(ProductControllers.getAllProducts)

router
  .route('/:productId')
  .get(ProductControllers.getSingleProduct)
  .put(ProductControllers.updateProduct)
  .delete(ProductControllers.deleteSingleProduct)

export const ProductRoute = router

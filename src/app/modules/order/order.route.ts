import express from 'express'
import { orderControllers } from './order.controller'

const router = express.Router()

router
  .route('/')
  .post(orderControllers.createOrder)
  .get(orderControllers.getAllOrders)

export const OrderRoute = router

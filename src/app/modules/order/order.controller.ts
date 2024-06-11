import { Request, Response } from 'express'
import { TOrder } from './order.interface'
import { orderServices } from './order.service'
import orderValidationSchema from './order.validation'
import { Product } from '../product/product.model'
import { ProductServices } from '../product/product.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body

    // zod validation:
    const zodParseData = orderValidationSchema.parse(orderData)

    const productId = orderData.productId
    const product = await Product.findById(productId).select('-_id')
    if (!product) {
      return res.status(500).json({
        succcess: false,
        message: 'Product not found',
      })
    }

    const orderQuantity = orderData.quantity
    const productQuantity = product.inventory.quantity

    if (orderQuantity > productQuantity) {
      return res.status(500).json({
        succcess: false,
        message: 'Insufficient quantity available in inventory',
      })
    }

    product.inventory.quantity = productQuantity - orderQuantity
    product.inventory.inStock = productQuantity - orderQuantity > 0

    await ProductServices.updateProduct(productId, product)
    const result = await orderServices.createOrder(zodParseData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Fail to create order',
      error: error,
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query
    const result = await orderServices.getAllOrdersFromDB(email as string)
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result.length
        ? result
        : email
          ? `No order by this user email`
          : 'No oder available',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Order not found',
      error: error,
    })
  }
}

export const orderControllers = {
  createOrder,
  getAllOrders,
}

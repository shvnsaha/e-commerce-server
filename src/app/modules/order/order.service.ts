import { TOrder } from './order.interface'
import { Order } from './order.model'

const createOrder = async (PayLoad: TOrder) => {
  const result = await Order.create(PayLoad)
  return result
}

const getAllOrdersFromDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email }).select('-__v')
    return result
  } else {
    const result = await Order.find().select('-__v')
    return result
  }
}

export const orderServices = {
  createOrder,
  getAllOrdersFromDB,
}

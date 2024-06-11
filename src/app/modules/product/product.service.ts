import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProduct = async (payLoad: TProduct) => {
  const result = await Product.create(payLoad)
  return result
}

const getAllProductsFromDB = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Product.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { category: { $regex: new RegExp(searchTerm, 'i') } },
        { description: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    }).select('-__v')
    return result
  }
  const result = await Product.find().select('-__v')
  return result
}

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId)
  return result
}

const updateProduct = async (productId: string, payLoad: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, payLoad, {
    new: true,
  })
  return result
}

const deleteSingleProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId)
  return result
}

export const ProductServices = {
  createProduct,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProduct,
  deleteSingleProductFromDB,
}

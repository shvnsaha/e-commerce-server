import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import productValidationSchema from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body

    // zod validation:
    const zodParseData = productValidationSchema.parse(productData)
    const result = await ProductServices.createProduct(zodParseData)
    res.json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      succcess: false,
      message: 'Fail to create product!',
      error: err,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query
    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    )
    res.status(200).json({
      succcess: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result.length
        ? result
        : searchTerm
          ? `No product available for '${searchTerm}'`
          : 'No product available',
    })
  } catch (err: any) {
    res.status(500).json({
      succcess: false,
      message: 'Fail to get products',
      error: err.message,
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)
    if (result !== null) {
      res.status(200).json({
        succcess: true,
        message: 'Product fetched successfully!',
        data: result,
      })
    } else {
      res.status(500).json({
        succcess: false,
        message: 'Product not found',
      })
    }
  } catch (err: any) {
    res.status(500).json({
      succcess: false,
      message: 'Product not found',
      error: err.message,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updatedData = req.body
    const zodParseData = productValidationSchema.parse(updatedData)
    const result = await ProductServices.updateProduct(productId, zodParseData)

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Fail to update product',
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Fail to update product',
      error: error,
    })
  }
}

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.deleteSingleProductFromDB(productId)
    if (result) {
      res.status(200).json({
        succcess: true,
        message: 'Product deleted successfully!',
        data: null,
      })
    } else {
      res.status(500).json({
        succcess: false,
        message: 'Fail to delete product',
      })
    }
  } catch (err: any) {
    res.status(500).json({
      succcess: false,
      message: 'Fail to delete product',
      error: err.message,
    })
  }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
}

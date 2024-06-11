import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoute } from './app/modules/product/product.route'
import { OrderRoute } from './app/modules/order/order.route'

const app: Application = express()

// middlewares
app.use(express.json())
app.use(cors())

// route operation
app.use('/api/products', ProductRoute)
app.use('/api/orders', OrderRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome e-commerce server')
})

// not found route
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  })
})

export default app

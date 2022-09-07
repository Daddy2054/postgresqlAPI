import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'

//import articlesRoutes from './routes/articles'
//import usersRoutes from './routes/users'
//import productsRoutes from './routes/products'
//import ordersRoutes from './routes/orders'
//import cartsRoutes from './routes/carts'
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
//void app.use('/articles', articlesRoutes);
//void app.use('/users', usersRoutes);
//void app.use('/products', productsRoutes);
//void app.use('/orders', ordersRoutes);
//void app.use('/carts', cartsRoutes);
app.get('/', function (req: Request, res: Response) {
    res.send('API is running...')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

import dotevn from "dotenv"
dotevn.config()
import connectDB from "./config/db.js"
connectDB()
import express from 'express'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound, customErrorHandler} from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req,res)=> {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

app.use(notFound)
app.use(customErrorHandler)

app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})
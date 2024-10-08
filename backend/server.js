import path from 'path'
import dotevn from "dotenv"
dotevn.config()
import connectDB from "./config/db.js"
connectDB()
import express from 'express'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, customErrorHandler} from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req,res)=> {
        res.send('API is running...')
    })
}

app.use(notFound)
app.use(customErrorHandler)

app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})
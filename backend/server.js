import dotevn from "dotenv"
dotevn.config()
import connectDB from "./config/db.js"
connectDB()
import express from 'express'
import productRoutes from './routes/productRoutes.js'
import {notFound, customErrorHandler} from './middlewares/errorHandler.js'

const PORT = process.env.PORT
const app = express()

app.get('/', (req,res)=> {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(customErrorHandler)

app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})
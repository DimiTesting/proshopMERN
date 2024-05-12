import dotevn from "dotenv"
dotevn.config()
import connectDB from "./config/db.js"
connectDB()
import express from 'express'
import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'

const PORT = process.env.PORT
const app = express()

app.get('/', (req,res)=> {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})
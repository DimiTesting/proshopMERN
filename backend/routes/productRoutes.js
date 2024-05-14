import express from 'express'
import Product from '../models/productModel.js'
import asynchHandler from '../middlewares/asynchHandler.js'

const router = express.Router()

router.get('/', asynchHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

router.get('/:id', asynchHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }

}))

export default router
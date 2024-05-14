import asynchHandler from "../middlewares/asynchHandler.js";
import Product from "../models/productModel.js";


//@desc Get all products
//@path /api/products
//@access Public

const getProducts = asynchHandler(async(req, res)=> {
    const products = await Product.find({})
    res.json(products)
})

//@desc Get product
//@path /api/products/:id
//@access Public


const getProductById = asynchHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }
})

export {getProducts, getProductById}
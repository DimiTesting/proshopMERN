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

//@desc Create product
//@method POST
//@path /api/products
//@access Private, Admin

const createProduct = asynchHandler(async(req, res) => {
    const product = new Product({
        user: req.user._id, 
        name: "sample", 
        image: '/images/sample.jpg', 
        brand: "sample", 
        category: "sample", 
        description: "sample", 
        numReviews: 0, 
        price: 0,
        countInStock: 0
    })
    const newProduct = await product.save()
    res.status(201).json(newProduct)
})


//@desc Update product
//@method PUT
//@path /api/products/:id
//@access Private, Admin

const updateProduct = asynchHandler(async(req, res) => {
    const {name, brand, image, category, description, price, countInStock} = req.body
    const product = await Product.findById(req.params.id)
    
    if(product) {
        product.name = name
        product.brand = brand
        product.image = image
        product.category = category
        product.description = description
        product.price = price
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export {getProducts, getProductById, createProduct, updateProduct}
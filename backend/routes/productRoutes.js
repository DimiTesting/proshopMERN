import express from 'express'
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopRatedProducts} from '../controllers/productController.js'
import {protect, admin} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopRatedProducts)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/review').post(protect, createProductReview)

export default router
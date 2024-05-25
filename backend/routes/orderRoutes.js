import express from 'express'
import {protect, admin} from '../middlewares/authMiddleware.js'
import {    
    addOrderItems,
    getMyOrders,
    getOrderById, 
    updateOrderToPaid, 
    updateOrderToDelivered, 
    getOrders} from '../controllers/orderControllers.js'

const router = express.Router()

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, admin, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
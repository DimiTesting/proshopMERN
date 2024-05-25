import asynchHandler from '../middlewares/asynchHandler.js'
import Order from '../models/orderModel.js'

//desc Create new order
//route POST /api/orders
//access Private

const addOrderItems = asynchHandler(async(req,res) => {
    res.send('Add orders')
})

//desc Get logged-in user orders
//route GET /api/orders/myorders
//access Private

const getMyOrders = asynchHandler(async(req,res) => {
    res.send('Get my orders')
})

//desc Orders by Id
//route GET /api/orders/:id
//access Private

const getOrderById = asynchHandler(async(req,res) => {
    res.send('Get orders by Id')
})

//desc Update order to paid 
//route PUT /api/orders/:id/pay
//access Private

const updateOrderToPaid = asynchHandler(async(req,res) => {
    res.send('Update order to be paid ')
})

//desc Update order to delivered 
//route PUT /api/orders/:id/deliver
//access Private/Admin

const updateOrderToDelivered = asynchHandler(async(req,res) => {
    res.send('Update order to be delivered ')
})

//desc Get all orders
//route GET /api/orders/
//access Private/Admin

const getOrders = asynchHandler(async(req,res) => {
    res.send('All orders ')
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById, 
    updateOrderToPaid, 
    updateOrderToDelivered, 
    getOrders
}
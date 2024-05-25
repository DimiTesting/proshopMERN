import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): { cartItem: [], shippingAddress: {}, paymentMethod: 'PayPal' }

export const cartSlice = createSlice({
    name: "cart", 
    initialState, 
    reducers: {
        addToCart : (state, action) => {
            const item = action.payload
            const existItem = state.cartItem.find((x)=> x._id === item._id)
            if (existItem) {
                state.cartItem = state.cartItem.map((x)=> x._id === existItem._id ? item : x)
            } else {
                state.cartItem = [...state.cartItem, item]
            }
            updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((x) => x._id !== action.payload)
            updateCart(state)
        }, 
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            updateCart(state)
        }
    },
})

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod} = cartSlice.actions

export default cartSlice.reducer
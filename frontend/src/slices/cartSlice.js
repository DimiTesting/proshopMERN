import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): { cartItem: [] }

const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
}

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

            state.ItemPrice = addDecimals(state.cartItem.reduce((acc, item) => acc+item.price*item.qty, 0))
            state.ShippingPrice = addDecimals(Number(state.ItemPrice) > 100 ? 0 : 10)
            state.TaxPrice = addDecimals(Number(state.ItemPrice) * 0.15)
            state.Total = addDecimals(Number(state.ItemPrice) + Number(state.ShippingPrice) + Number(state.TaxPrice))

            localStorage.setItem('cart', JSON.stringify(state))
        }
    },
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer
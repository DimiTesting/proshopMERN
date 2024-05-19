export const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
}


export const updateCart = (state) => {
    state.ItemPrice = addDecimals(state.cartItem.reduce((acc, item) => acc+item.price*item.qty, 0))
    state.ShippingPrice = addDecimals(Number(state.ItemPrice) > 100 ? 0 : 10)
    state.TaxPrice = addDecimals(Number(state.ItemPrice) * 0.15)
    state.Total = addDecimals(Number(state.ItemPrice) + Number(state.ShippingPrice) + Number(state.TaxPrice))

    localStorage.setItem('cart', JSON.stringify(state))
    return state
}
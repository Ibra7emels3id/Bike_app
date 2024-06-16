import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    isLoading: false,
    error: null,
    cartQuantity: 0,
    CartTitle: 0,
    ShowAlerttran: false,
}

const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        // Add to cart
        addToCart: (state, action) => {
            const CartItem = state.cart.findIndex((item) => item.id === action.payload.id)
            if (CartItem >= 0) {
                state.cart[CartItem].quantity += 1
                toast.warn(`Add quantity to cart   ${state.cart[CartItem].quantity}`)
            } else {
                const tempProduct = { ...action.payload, quantity: 1 }
                state.cart.push(tempProduct)
                toast.success(`Add to cart`)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        // Remove to Cart quantity 
        removeItem: (state, action) => {
            const CartItem = state.cart.findIndex((item) => item.id == action.payload.id)
            if (CartItem >= 0) {
                state.cart[CartItem].quantity -= 1
                if (state.cart[CartItem].quantity <= 0) {
                    state.cart.splice(CartItem, 1)
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        // cleare Cart 
        CleareItem: (state, action) => {
            const miunsitem = state.cart.filter(item => item.id !== action.payload.id);
            state.cart = miunsitem;
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        // Get Title And Quantity
        getTitle: (state, action) => {
            state.CartTitle = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
            state.cartQuantity = state.cart.reduce((quantity, item) => quantity + item.quantity, 0)
        },
        // Remove all cart items
        removeFromCart: (state, action) => {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        // show Alert dialog
        ShowAlert: (state, action) => {
            if (state.ShowAlerttran === false) {
                state.ShowAlerttran = true;
            } else {
                state.ShowAlerttran = false;
            }
        }
    }
})

export const { addToCart, removeItem, removeFromCart, CleareItem, getTitle, ShowAlert } = CartSlice.actions;
export default CartSlice.reducer;
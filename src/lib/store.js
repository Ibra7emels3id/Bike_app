import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './features/ProductsSlice'
import cartSlice from './features/cartSlice'

export const store = configureStore({
    reducer: {
        data: ProductsSlice,
        cart: cartSlice
        
    }
})
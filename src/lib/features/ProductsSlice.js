const { createSlice , createAsyncThunk } = require("@reduxjs/toolkit");


export const FetchProducts = createAsyncThunk('FetchProducts', async ()=>{
    const data = await fetch('http://localhost:9000/posts')
    const products = await data.json()
    return products
})

const initialState = {
    products: [],
    isLoading: false,
    error: null,
}


const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(FetchProducts.pending , (state , action)=>{
            state.isLoading = true
        })
        builder.addCase(FetchProducts.fulfilled , (state , action)=>{
            state.isLoading = false
            state.products = action.payload
        })
    }
}) 

export default productSlice.reducer
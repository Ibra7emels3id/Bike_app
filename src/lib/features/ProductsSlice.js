const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// Get All Data Api 
export const FetchProducts = createAsyncThunk('FetchProducts', async () => {
    try {
        const data = await fetch('http://localhost:9000/posts')
        const products = await data.json()
        return products
    }catch (err) {
        console.error(err)
    }
})

// Delete Item Api
export const DeleteProduct = createAsyncThunk('DeleteProduct', async (id) => {
    try {
        await fetch(`http://localhost:9000/posts/${id}`, {
            method: 'DELETE'
        })
        return id
    } catch (err) {
        console.error(err)
    }
})

// Add Item Api
export const AddProduct = createAsyncThunk('AddProduct', async (product) => {
    try {
        await fetch('http://localhost:9000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        return product
    } catch (err) {
        console.error(err)
    }
})

// Handle Edite Product

export const EditeProduct = createAsyncThunk('EditeProduct', async (Data) => {
    try {
        await fetch(`http://localhost:9000/posts/${Data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
        return Data
    } catch (err) {
        console.error(err)
    }
})

const initialState = {
    products: [],
    isLoading: false,
    error: null,
}


const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {

        // Get Data Api 
        builder.addCase(FetchProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload
        })

        // Delete item
        builder.addCase(DeleteProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(DeleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
            state.isLoading = false
        })
        builder.addCase(DeleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        // Add item
        builder.addCase(AddProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(AddProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.products.push(action.payload)
        })
        builder.addCase(AddProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        // Edite item
        builder.addCase(EditeProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(EditeProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product)
        })
        builder.addCase(EditeProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer
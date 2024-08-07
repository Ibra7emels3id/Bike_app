const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


// Get All Data Api 
export const FetchProducts = createAsyncThunk('FetchProducts', async () => {
    try {
        const data = await fetch('http://localhost:9000/posts')
        const products = await data.json()
        return products
    } catch (err) {
        console.error(err)
    }
})
// Get All Data Api category
export const FetchCategory = createAsyncThunk('FetchCategory', async () => {
    try {
        const data = await fetch('http://localhost:9000/category')
        const category = await data.json()
        return category
    } catch (err) {
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
// get All Cart transactions Users
export const FetchGettransaction = createAsyncThunk('FetchGettransaction', async () => {
    try {
        const data = await fetch('http://localhost:9000/cart')
        const transactions = await data.json()
        return transactions
    } catch (err) {
        console.error(err)
    }
})

// get All Cart transactions Admin
export const FetchGettransactionAdmin = createAsyncThunk('FetchGettransactionAdmin', async () => {
    try {
        const data = await fetch('http://localhost:9000/cart')
        const transactions = await data.json()
        return transactions
    } catch (err) {
        console.error(err)
    }
})


const initialState = {
    products: [],
    category:[],
    isLoading: false,
    error: null,
    Gettransaction: [],
    GetTransactionAdmin: [],
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

        // Get Data Api category
        builder.addCase(FetchCategory.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.category = action.payload
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
        // get All Care transactions
        builder.addCase(FetchGettransaction.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchGettransaction.fulfilled, (state, action) => {
            state.isLoading = false
            state.Gettransaction = action.payload
        })
        // get All Cart transactions Admin
        builder.addCase(FetchGettransactionAdmin.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchGettransactionAdmin.fulfilled, (state, action) => {
            state.isLoading = false
            state.GetTransactionAdmin = action.payload
        })
        // get All Cart transactions Admin
        builder.addCase(FetchGettransactionAdmin.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer
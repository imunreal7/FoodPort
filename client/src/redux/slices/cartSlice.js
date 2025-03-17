// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper to set auth headers (e.g., for each fetch or axios call)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // or from Redux state
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

// Defaults to localhost if REACT_APP_API_URL is not set
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Fetch the existing cart from the server (if any).
 */
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        if (!res.ok) {
            throw new Error("Failed to fetch cart");
        }
        return await res.json(); // { items: [...], total: 123 }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/**
 * Add an item to the cart in the backend.
 * Payload: { productId, quantity, price }
 */
export const addToCart = createAsyncThunk("cart/addToCart", async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/add`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            throw new Error("Failed to add item to cart");
        }
        return await res.json(); // updated cart
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/**
 * Add a new product in the backend.
 * Payload: { name, price, ... }
 */
export const addProduct = createAsyncThunk("product/add", async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/products`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            throw new Error("Failed to add product");
        }
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/**
 * Get a product by name from the backend.
 * Payload: name (string)
 */
export const getProduct = createAsyncThunk("product/getByName", async (name, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/products/name?name=${encodeURIComponent(name)}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }
        return await res.json(); // array of products
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/**
 * Remove a specific item from the cart in the backend.
 * Payload: { productId }
 */
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/remove`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            throw new Error("Failed to remove item");
        }
        return await res.json(); // updated cart
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/**
 * Clear the cart in the backend.
 */
export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/clear`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!res.ok) {
            throw new Error("Failed to clear cart");
        }
        return await res.json(); // updated cart (now empty)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/**
 * Checkout -> create an order from the cart, then clear the cart in the backend.
 * Payload: { ... }
 */
export const createOrder = createAsyncThunk("cart/createOrder", async (orderPayload, thunkAPI) => {
    try {
        const res = await fetch(`${apiUrl}/api/orders`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(orderPayload),
        });
        if (!res.ok) {
            // Optionally parse the error response for more detail
            const errorData = await res.json();
            throw new Error(errorData.msg || "Failed to create order");
        }
        return await res.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
        shippingFee: 250,
        loading: false,
        error: null,
        lastOrder: null, // store the last placed order
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetchCart
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items || [];
            state.total = action.payload.total || 0;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // addToCart
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items || [];
            state.total = action.payload.total || 0;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // removeFromCart
        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items || [];
            state.total = action.payload.total || 0;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // clearCart
        builder.addCase(clearCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items || [];
            state.total = action.payload.total || 0;
        });
        builder.addCase(clearCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // createOrder
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.lastOrder = null;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.lastOrder = action.payload; // store the created order
            // after createOrder, the cart is cleared in the backend
            state.items = [];
            state.total = 0;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default cartSlice.reducer;


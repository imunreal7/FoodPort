import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        shipping_fee: 250,
        total: 0,
    },
    reducers: {
        additem: (state, action) => {
            // Use a unique identifier: if id exists use it; otherwise, use name.
            const productId = action.payload.id ? action.payload.id : action.payload.name;

            // Find if the product already exists in the cart using the unique identifier.
            const itemIndex = state.items.findIndex((item) => item.id === productId);

            if (itemIndex >= 0) {
                // If it exists, increase its quantity.
                state.items[itemIndex].quantity += 1;
            } else {
                // Otherwise, add a new product entry with quantity set to 1.
                const tempProduct = { ...action.payload, id: productId, quantity: 1 };
                state.items.push(tempProduct);
            }

            // Recalculate the total as the sum of price * quantity for all items.
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        removeItem: (state, action) => {
            // Remove items by filtering out those with the matching unique id.
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            // Recalculate the total after removal.
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { additem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


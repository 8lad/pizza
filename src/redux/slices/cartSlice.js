import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                // eslint-disable-next-line no-plusplus
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * (item.count ?? 1)), 0);
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem && findItem.count > 1) {
                // eslint-disable-next-line no-plusplus
                findItem.count--;
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * (item.count ?? 1)), 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});
export const selectCartItemById = id => state => state.cart.items.find(obj => obj.id === id);
export const selectCart = (state) => state.cart;
export const cart = cartSlice.reducer;
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions; 
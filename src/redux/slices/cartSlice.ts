import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../store";

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number[];
  size: number[];
  count?: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  items: getCartFromLS(),
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count) {
        // eslint-disable-next-line no-plusplus
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * (item.count ?? 1), 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      // eslint-disable-next-line no-plusplus
      findItem && findItem.count!--;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * (item.count ?? 1), 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItemType) => obj.id === id);
export const selectCart = (state: RootState) => state.cart;
export const cart = cartSlice.reducer;
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { filters } from "./slices/filterSlice";
// eslint-disable-next-line import/no-cycle
import { cart } from "./slices/cartSlice";
import { pizza } from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filters,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

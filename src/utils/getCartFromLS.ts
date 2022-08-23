/* eslint-disable import/no-cycle */
import { CartItemType } from "../redux/slices/cartSlice";
import calcTotalPrice from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  return {
    items: items as CartItemType[],
    totalPrice: calcTotalPrice(items),
  };
};

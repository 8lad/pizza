import { CartItemType } from "../redux/slices/cartSlice";

export default function calcTotalPrice(items: CartItemType[]) {
  return items.reduce((sum: number, obj) => obj.price * obj.count! + sum, 0);
}

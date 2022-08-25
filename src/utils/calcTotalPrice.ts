// eslint-disable-next-line import/no-cycle

import { CartItemType } from "../redux/cart/types";

export default function calcTotalPrice(items: CartItemType[]) {
  return items.reduce((sum: number, obj) => obj.price * obj.count! + sum, 0);
}

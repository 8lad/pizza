import { SortType } from "../redux/filter/types";

export const sortList: SortType[] = [
  { name: "популярности: возрастание", sortProperty: "rating" },
  { name: "популярности: убывание", sortProperty: "-rating" },
  { name: "цене: возрастание", sortProperty: "price" },
  { name: "цене: убывание", sortProperty: "-price" },
  { name: "алфавиту: возрастание", sortProperty: "title" },
  { name: "алфавиту: убывание", sortProperty: "-title" },
];

export const pizzaTypes = ["тонкое", "традиционное"];

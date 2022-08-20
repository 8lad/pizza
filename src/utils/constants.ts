export type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortList: SortItem[] = [
  { name: "популярности: возрастание", sortProperty: "rating" },
  { name: "популярности: убывание", sortProperty: "-rating" },
  { name: "цене: возрастание", sortProperty: "price" },
  { name: "цене: убывание", sortProperty: "-price" },
  { name: "алфавиту: возрастание", sortProperty: "title" },
  { name: "алфавиту: убывание", sortProperty: "-title" },
];

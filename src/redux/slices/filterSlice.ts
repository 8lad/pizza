import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../store";

type SortPropertyType = "rating" | "title" | "price" | "-rating" | "-title" | "-price";

type SortType = {
  name: string;
  sortProperty: SortPropertyType;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: { name: "популярности: возрастание", sortProperty: "rating" },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectorSort = (state: RootState) => state.filters.sort;
export const selectorFilter = (state: RootState) => state.filters;
export const filters = filtersSlice.reducer;
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filtersSlice.actions;

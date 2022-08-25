import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { FilterSliceState, SortType } from "./types";

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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const filters = filtersSlice.reducer;
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filtersSlice.actions;

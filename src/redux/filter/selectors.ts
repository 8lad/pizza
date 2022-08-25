import { RootState } from "../store";

export const selectorSort = (state: RootState) => state.filters.sort;
export const selectorFilter = (state: RootState) => state.filters;

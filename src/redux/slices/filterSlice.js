import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: { name: "популярности: возрастание", sortProperty: "rating" }
};

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        }
    }
});

export const filters = filtersSlice.reducer;
export const { setCategoryId, setSort } = filtersSlice.actions;
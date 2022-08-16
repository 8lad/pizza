import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "loading"
};

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async (queryString) => {
        const response = await axios.get(queryString);
        return response.data;
    }
);

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "succeess";
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });

    }
});

export const pizza = pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions;
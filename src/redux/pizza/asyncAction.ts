import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], string>("pizza/fetchPizzasStatus", async (queryString: string) => {
  const response = await axios.get<Pizza[]>(queryString);
  return response.data;
});

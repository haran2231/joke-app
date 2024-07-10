import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous thunk action to fetch a joke by category
const fetchJoke = createAsyncThunk("jokes/fetchJoke", async (category, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
    return response.data.value;
  } catch (error) {
    return rejectWithValue("Category is not found buddy");
  }
});

const initialState = {
  joke: "No Joke.....",
  loading: false,
  error: null
};

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.loading = false;
        state.joke = action.payload;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default jokeSlice.reducer; // Exporting the reducer directly
export { fetchJoke };

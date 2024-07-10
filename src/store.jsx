import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "./jokeslice"; // Importing the default reducer

const store = configureStore({
  reducer: {
    joke: jokeReducer // Assigning the imported reducer
  }
});

export default store;

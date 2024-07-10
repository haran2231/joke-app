import React, { useState, useEffect } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { fetchJoke } from "./jokeslice";
// import store from "./store"; // Importing the configured store
import axios from "axios";

function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const jokeState = useSelector((state) => state.joke);
  const { joke, loading, error } = jokeState || { joke: "", loading: false, error: null };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.chucknorris.io/jokes/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const getCategory = (e) => {
    setCategory(e.target.value);
  };

  const getJokes = () => {
    dispatch(fetchJoke(category));
    setCategory("");
  };

  return (
    <div className="App flex flex-col items-center mt-56 bg-yellow-200">
       <h1 className="text-center text-3xl mb-6 font-semibold">JOKE APP</h1>
      <input
        onChange={getCategory}
        value={category}
        type="text"
        className="border border-solid border-black px-5 py-2 w-96"
        placeholder="Enter joke category"
      />
      <br />
      <button onClick={getJokes} className="bg-black px-3 py-2 text-white">
        {loading ? "Loading..." : `Get Jokes from ${category}`}
      </button>

      {error ? (
        <div className="mt-4 text-2xl ">
          <p className="text-red-500 text-2xl">{error}</p>
          <p>Available categories:</p>
          <ul className="text-xl text-green-700">
            {categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="mt-4 text-2xl px-4">{joke}</h1>
      )}
    </div>
  );
}


export default App;

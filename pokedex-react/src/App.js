import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  /* The code `const [pokeData, setPokeData] = useState([]);` is using the `useState` hook to declare a
  state variable called `pokeData` and a function called `setPokeData` to update the value of
  `pokeData`. The initial value of `pokeData` is an empty array `[]`. */
  const [pokeData, setPokeData] = useState([]);

  /* The line `const [loading, setLoading] = useState(true);` is using the `useState` hook to declare a
  state variable called `loading` and a function called `setLoading` to update the value of
  `loading`. The initial value of `loading` is set to `true`. This variable is used to keep track of
  whether the data is still being fetched or if it has finished loading. */
  const [loading, setLoading] = useState(true);

  /* The `useEffect` hook in this code is used to fetch data from the PokeAPI and update the state of
  the component. */
  useEffect(() => {
    /**
     * The fetchData function fetches data from the PokeAPI, processes it, and updates the pokeData
     * state.
     */
    const fetchData = async () => {
      const cacheBust = Date.now();
      /* The `axios` function is used to make an HTTP GET request to the specified URL. In this case, it
     is making a request to the PokeAPI to fetch a list of Pokemon. The URL includes a query
     parameter `limit=1015` which specifies the maximum number of Pokemon to be returned in the
     response. The `_=` is used to add a cache-busting parameter to the URL, ensuring
     that the request is not cached by the browser. The response from the API is stored in the
     `result` variable. */
      const result = await axios(
        `https://pokeapi.co/api/v2/pokemon?limit=1015&_=${cacheBust}`
      );

      /* The code `result.data.results.forEach(async (e) => { ... })` is iterating over each element in
      the `results` array of the `result.data` object. */
      result.data.results.forEach(async (e) => {
        const pokeURL = e.url;

        /* The line `const pokemonData = await pokemon(pokeURL);` is calling the `pokemon` function and
        passing the `pokeURL` as an argument. The `pokemon` function makes an asynchronous request
        to the specified URL and returns the data of the Pokemon fetched from that URL. The returned
        data is then stored in the `pokemonData` variable. */
        const pokemonData = await pokemon(pokeURL);

        /* `setPokeData((prevData) => [...prevData, pokemonData]);` is updating the state variable
        `pokeData` by adding the `pokemonData` object to the existing array of data. */
        setPokeData((prevData) => [...prevData, pokemonData]);
      });

      /* The line `setPokeData((prevData) => prevData.sort((a, b) => a.order - b.order));` is sorting
      the `pokeData` array in ascending order based on the `order` property of each element. */
      setPokeData((prevData) => prevData.sort((a, b) => a.order - b.order));

      /* The line `setLoading(false);` is updating the state variable `loading` to `false`. This is
      done to indicate that the data fetching process is complete and the component is no longer in
      a loading state. */
      setLoading(false);
    };

    /**
     * The function "pokemon" makes an asynchronous request to a specified URL and logs the response
     * data to the console.
     * @param pokeURL - The `pokeURL` parameter is a string that represents the URL of a Pokémon API
     * endpoint.
     * @returns the data of the Pokemon fetched from the provided pokeURL.
     */
    const pokemon = async (pokeURL) => {
      /* The line `const pokemon = await axios(pokeURL);` is making an asynchronous HTTP GET request to
      the specified `pokeURL` and storing the response data in the `pokemon` variable. */
      const pokemon = await axios(pokeURL);
      return pokemon.data;
    };
    fetchData();
  }, []);

  return (
    <div>
      {
        /* The code `loading ? (<p>Loading...</p>)` is a conditional rendering statement in JSX. It
      checks the value of the `loading` state variable. */
        loading ? (
          <p>Loading...</p>
        ) : (
          <div className="App">
            <h1>Pokedex</h1>
            <div className="card-container">
              {/* The code  is mapping over the `pokeData` array and rendering a set of JSX
              elements for each element in the array. The element contains name, order, and image of each Pokemon*/}
              {pokeData.map((pokemon) => (
                <div className="card" key={pokemon.id}>
                  <h2>{pokemon.order}</h2>
                  <img src={pokemon.sprites.front_default} alt="pokemon" />
                  <h2>{pokemon.name}</h2>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;

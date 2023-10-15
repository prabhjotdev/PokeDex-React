import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cacheBust = Date.now();
      const result = await axios(
        `https://pokeapi.co/api/v2/pokemon?limit=1015&_=${cacheBust}`
      );

      result.data.results.forEach(async (e) => {
        const pokeURL = e.url;
        const pokemonData = await pokemon(pokeURL);
        setPokeData((prevData) => [...prevData, pokemonData]);
      });

      setPokeData((prevData) => prevData.sort((a, b) => a.order - b.order));
      setLoading(false);
    };

    const pokemon = async (pokeURL) => {
      const pokemon = await axios(pokeURL);
      console.log(pokemon.data);
      return pokemon.data;
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="App">
          <h1>Pokedex</h1>
          <div className="card-container">
            {pokeData.map((pokemon) => (
              <div className="card" key={pokemon.id}>
                <h2>{pokemon.order}</h2>
                <img src={pokemon.sprites.front_default} alt="pokemon" />
                <h2>{pokemon.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

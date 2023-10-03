import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API URL
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";

    // Fetch data from the API using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data.results);
        setPokeData(response.data.results); // Store the fetched data in state
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      });
  }, []); // The empty array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <h2>API Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokeData.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

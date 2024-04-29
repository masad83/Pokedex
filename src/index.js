import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from './store'; // Import the store from store.js
import { usePokemonListQuery, usePokemonDetailQuery } from './api'; 
import { Provider } from "react-redux";
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

function App() {
  const [selectedPokemon, selectPokemon] = React.useState(undefined);

  return (
    <>
      <header>
        <h1>My Pokedex</h1>
      </header>
      <main>
        {selectedPokemon ? (
          <>
            <PokemonDetails pokemonName={selectedPokemon} />
            <button onClick={() => selectPokemon(undefined)}>back</button>
          </>
        ) : (
          <PokemonList onPokemonSelected={selectPokemon} />
        )}
      </main>
    </>
  );
}




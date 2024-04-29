import React, { useState } from "react";
import { usePokemonListQuery } from './api'; // Import usePokemonListQuery from api.js
import PokemonDetails from './PokemonDetails';

function PokemonList({ onPokemonSelected }) {
    //const data = fakePokemonListing;
    const { isLoading, isError, isSuccess, data } = usePokemonListQuery();
  
    if (isLoading) {
      return <p>loading, please wait</p>;
    }
  
    if (isError) {
      return <p>something went wrong</p>;
    }
  
    if(isSuccess){
      return (
        <article>
          <h2>Overview</h2>
          <ul start={1}>
            {data.results.map((pokemon) => (
              <li key={pokemon.name} onClick={() => onPokemonSelected(pokemon.name)}>
                <a>
                    <img  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt='pokemon' />
                    <span>{pokemon.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      );
    }
  
  }

export default PokemonList;
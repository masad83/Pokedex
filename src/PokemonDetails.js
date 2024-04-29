import React from "react";
import { usePokemonDetailQuery } from './api'; // Import usePokemonDetailQuery from api.js

const listFormatter = new Intl.ListFormat("en-GB", {
    style: "short",
    type: "conjunction",
  });
  
function PokemonDetails({ pokemonName }) {
    //const data = fakePokemonDetailData;
    const { isLoading, isError, isSuccess, data } = usePokemonDetailQuery(pokemonName);
    
    if (isLoading) {
      return <p>loading, please wait</p>;
    }
    if (isError) {
      return <p>something went wrong</p>;
    }
  
    return (
      <article>
        <h2>{data.name}</h2>
        <img src={data.sprites.front_default} alt={data.name} />
        <ul>
          <li>id: {data.id}</li>
          <li>height: {data.height}</li>
          <li>weight: {data.weight}</li>
          <li>
            types:
            {listFormatter.format(data.types.map((item) => item.type.name))}
          </li>
        </ul>
      </article>
    );
}

export default PokemonDetails;
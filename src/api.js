import { createApi, ApiProvider, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://pokeapi.co/api/v2/";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    pokemonList: build.query({
      query() {
        return {
          url: "pokemon",
          params: { limit: 9 },
        };
      },
      // Handle successful list retrieval for chaining details fetching
    //   async onQuerySuccess(pokemonListData, { dispatch }) {
    //     const pokemonDetailsPromises = pokemonListData.results.map((pokemon) =>
    //       dispatch(usePokemonDetailQuery(pokemon.name))
    //     );
    //     await Promise.all(pokemonDetailsPromises);
    //   },
    }),
    pokemonDetail: build.query({
      query: (pokemonName) => `pokemon/${pokemonName}/`,
    }),
  }),
});

export const { usePokemonListQuery, usePokemonDetailQuery } = api;
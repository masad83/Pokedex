import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonList from "./PokemonList"; // Import PokemonList component
import { usePokemonListQuery } from './api'; // Mock usePokemonListQuery

jest.mock('./api', () => ({
  usePokemonListQuery: jest.fn(),
}));

// Test cases for different states of the component:

test("renders pokemon list with loading state", () => {
  // Mock the usePokemonListQuery to return loading state
  jest.mocked(usePokemonListQuery).mockReturnValueOnce({ isLoading: true });

  render(<PokemonList onPokemonSelected={jest.fn()} />);

  expect(screen.getByText("loading, please wait")).toBeInTheDocument();
});

test("renders pokemon list with error state", () => {
  // Mock the usePokemonListQuery to return error state
  jest.mocked(usePokemonListQuery).mockReturnValueOnce({ isError: true });

  render(<PokemonList onPokemonSelected={jest.fn()} />);

  expect(screen.getByText("something went wrong")).toBeInTheDocument();
});

test("renders pokemon list with data", () => {
  const mockData = {
    results: [
      { name: "bulbasaur" },
      { name: "charmander" },
    ],
  };

  // Mock the usePokemonListQuery to return data
  jest.mocked(usePokemonListQuery).mockReturnValueOnce({ isSuccess: true, data: mockData });

  render(<PokemonList onPokemonSelected={jest.fn()} />);

  const pokemonList = screen.getByRole("list");
  expect(pokemonList).toBeInTheDocument();

  const pokemonItems = screen.getAllByRole("listitem");
  expect(pokemonItems.length).toBe(2);

  expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  expect(screen.getByText("charmander")).toBeInTheDocument();
});

test("calls onPokemonSelected on item click", () => {
  const onPokemonSelectedMock = jest.fn();
  const mockData = {
    results: [
      { name: "bulbasaur" },
    ],
  };

  jest.mocked(usePokemonListQuery).mockReturnValueOnce({ isSuccess: true, data: mockData });

  render(<PokemonList onPokemonSelected={onPokemonSelectedMock} />);

  const bulbasaurItem = screen.getByText("bulbasaur");
  userEvent.click(bulbasaurItem);

  expect(onPokemonSelectedMock).toHaveBeenCalledWith("bulbasaur");
});
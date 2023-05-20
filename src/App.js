import { useEffect } from 'react';
import './App.css';
import { useGetPokemon } from './hooks/useGetPokemon';
import { useGlobalPokemonData } from './context/globalPokemonList';
import { useStorage } from './hooks/useStorage';

function App() {
  const { getPokemon, isLoading, error } = useGetPokemon()
  const { pokemonList, setPokemonList } = useGlobalPokemonData()
  const { setPersistenPokemonList } = useStorage()

  // Just checking if the API call worked
  useEffect(() => {
    getPokemon()
    setPersistenPokemonList(pokemonList)
  }, [])


  return (
    <div className="App">
      {pokemonList && pokemonList.map((pokemon, index) => {
        return (
          <div key={index}>
            <p>{pokemon.name}</p>
          </div>
        )
      })}

    </div>
  );
}

export default App;

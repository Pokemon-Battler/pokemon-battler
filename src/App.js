import { useEffect } from 'react';
import './App.css';
import { useGetPokemon } from './hooks/useGetPokemon';
import { useGlobalPokemonData } from './context/globalPokemonList';

function App() {
  const { getPokemon, isLoading, error } = useGetPokemon()
  const { pokemonList, setPokemonList } = useGlobalPokemonData()


  useEffect(() => {
    getPokemon()
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

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
      <header className="App-header">
        <h1 className='text-7xl'>Test</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

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

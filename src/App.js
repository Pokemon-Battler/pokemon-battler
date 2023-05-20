import { useEffect } from 'react'
import './App.css'
import { useGetPokemon } from './hooks/useGetPokemon'
import { useGlobalPokemonData } from './context/globalPokemonList'
import { useStorage } from './hooks/useStorage'

function App() {
    const { getPokemon, isLoading, error } = useGetPokemon()
    const { pokemonList, setPokemonList } = useGlobalPokemonData()
    const { setPersistenPokemonList } = useStorage()

    // Just checking if the API call worked
    useEffect(() => {
        getPokemon()
        setPersistenPokemonList(pokemonList)

        console.log(pokemonList[0])
    }, [])

    return (
        <div>
            <header>
                <h1 className='text-7xl text-center'>Pokemon Battler</h1>
            </header>

            <main>

				
                {/* Todo: turn this into PokemonPickerList component */}
                <div className='grid grid-cols-4 gap-2'>
                    {pokemonList &&
                        pokemonList.map((pokemon, index) => (
                            <div className='flex items-center justify-center rounded bg-red-500/10 hover:bg-red-500/20'>
                                <p>{pokemon.name}</p>
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt='pokemon selection image'
                                />
                            </div>
                        ))}
                </div>
            </main>
        </div>
    )
}

export default App

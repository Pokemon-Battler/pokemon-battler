import { useEffect } from 'react'
import './App.css'
import { useGetPokemon } from './hooks/useGetPokemon'
import { useGlobalPokemonData } from './context/globalPokemonList'
import { useStorage } from './hooks/useStorage'

import PokemonPickerList from './components/PokemonPickerList'
import PokemonCard from './components/PokemonCard'

function App() {
    const { getPokemon, isLoading, error } = useGetPokemon()
    const { pokemonList, setPokemonList } = useGlobalPokemonData()
    const { setPersistenPokemonList } = useStorage()

    // Just checking if the API call worked
    useEffect(() => {
        getPokemon()
        setPersistenPokemonList(pokemonList)

        // console.log(pokemonList[0])
    }, [])

    return (
        <div className='max-h-screen grid grid-rows-[auto_3fr_2fr]'>
            <h1 className='text-5xl text-center'>Pokemon Battler</h1>

            <div className='grid grid-cols-[1fr_auto_1fr] gap-2'>
                {/* <div className='border text-center'>Fighter 1</div> */}
				<PokemonCard fighterNum={1}/>
                <span className='self-center text-5xl'>VS</span>
                <div className='border text-center'>Fighter 2</div>
            </div>

            <PokemonPickerList />
        </div>
    )
}

export default App

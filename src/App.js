import { useEffect } from 'react'
import './App.css'
import { useGetPokemon } from './hooks/useGetPokemon'
import { useGlobalPokemonData } from './context/globalPokemonList'
import { useGlobalFighterData } from './context/globalFighterData'
import { useStorage } from './hooks/useStorage'

import PokemonPickerList from './components/PokemonPickerList'
import PokemonCard from './components/PokemonCard'

import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'

import FightPage from './pages/FightPage'
import LoadingPokeball from './components/LoadingPokeball'

function App() {
    const { getPokemon, isLoading, error } = useGetPokemon()
    const { pokemonList, setPokemonList } = useGlobalPokemonData()
    const { setPersistenPokemonList } = useStorage()

    const { fighterData, dispatch } = useGlobalFighterData()

    // Just checking if the API call worked
    useEffect(() => {
        getPokemon()
        setPersistenPokemonList(pokemonList)

        // console.log(fighterData.fighter1.pokemonId)
        // console.log(pokemonList[1])
    }, [])

    useEffect(() => {
        // console.log(pokemonList[20])
    }, [pokemonList])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        isLoading ? (
                            <LoadingPokeball />
                        ) : (
                            <div className='max-h-screen grid grid-rows-[auto_3fr_2fr]'>
                                <h1 className='text-5xl text-center p-2'>
                                    Pokemon Battler
                                </h1>

                                <div className='grid grid-cols-[1fr_auto_1fr] gap-3 px-2'>
                                    <PokemonCard
                                        fighterNum={1}
                                        pokemonId={fighterData.fighter1.id}
                                    />
                                    <span className='self-center text-5xl'>
                                        VS
                                    </span>
                                    <PokemonCard
                                        fighterNum={2}
                                        pokemonId={fighterData.fighter2.id}
                                    />
                                </div>

                                <PokemonPickerList />
                            </div>
                        )
                    }
                />
                <Route path='/fight' element={<FightPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

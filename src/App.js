import { useEffect, useState } from 'react'
import './App.css'
import { useGetPokemon } from './hooks/useGetPokemon'
import { useGlobalPokemonData } from './context/globalPokemonList'
import { useGlobalPlayerData } from './context/globalPlayerData'
import { useStorage } from './hooks/useStorage'

import PokemonPickerList from './components/PokemonPickerList'
import PokemonCard from './components/PokemonCard'

import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'

import FightPage from './pages/FightPage'
import LoadingPokeball from './components/LoadingPokeball'
import { act } from 'react-dom/test-utils'

function App() {
    const { getPokemon, isLoading, error } = useGetPokemon()
    const { pokemonList, setPokemonList } = useGlobalPokemonData()
    const { setPersistenPokemonList } = useStorage()
    const { playerData, playerDispatch } = useGlobalPlayerData()
    const [activePlayer, setActivePlayer] = useState(1)

    // Make all the API calls and get pokemon data on page refresh
    useEffect(() => {
        getPokemon()
    }, [])

    useEffect(() => {
        // console.log(pokemonList[20])
    }, [pokemonList])

    // Button handler to change which player is choosing a pokemon
    const handleChangeActivePlayer = () => {
        setActivePlayer(activePlayer === 1 ? 2 : 1)
        console.log(activePlayer)
    }

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

                                <button onClick={handleChangeActivePlayer}>Current player: {activePlayer}</button>

                                <div className='grid grid-cols-[1fr_auto_1fr] gap-3 px-2'>
                                    <PokemonCard
                                        playerNum={1}
                                        pokemon={playerData.player1}
                                    />
                                    <span className='self-center text-5xl'>
                                        VS
                                    </span>
                                    <PokemonCard
                                        playerNum={2}
                                        pokemon={playerData.player2}
                                    />
                                </div>

                                <PokemonPickerList playerNum={activePlayer} />
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

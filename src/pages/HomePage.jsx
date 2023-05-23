import React from 'react'
import { useEffect, useState } from 'react'
import { useGetPokemon } from '../hooks/useGetPokemon'
import { useGlobalPokemonData } from '../context/globalPokemonList'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { useStorage } from '../hooks/useStorage'
import PokemonPickerList from '../components/PokemonPickerList'
import PokemonCard from '../components/PokemonCard'
import LoadingPokeball from '../components/LoadingPokeball'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimate } from "framer-motion";


export default function HomePage() {
    const { getPokemon, isLoading } = useGetPokemon()
    const { pokemonList } = useGlobalPokemonData()
    const { setPersistenPokemonFighter } = useStorage()
    const { playerData, playerDispatch } = useGlobalPlayerData()
    const [activePlayer, setActivePlayer] = useState(1)
    const navigate = useNavigate()
    const [scope, animate] = useAnimate()

    // Make all the API calls and get pokemon data on page refresh
    useEffect(() => {
        getPokemon()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // if the pokemon list is updated, generate a random initial data for the first pokemon choices
    useEffect(() => {
        // console.log(pokemonList[20])
        if (pokemonList.length) {
            playerDispatch({ type: 'setup', payload: { player1: pokemonList[Math.floor(Math.random() * 151)], player2: pokemonList[Math.floor(Math.random() * 151)] } })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonList])

    // Button handler to change which player is choosing a pokemon
    const handleChangeActivePlayer = () => {
        setActivePlayer(activePlayer === 1 ? 2 : 1)
        console.log(activePlayer)
        animate(scope.current, { translateY: -5 }, { duration: 0.2 })
    }

    // Button handler to start the battle
    const startBattle = () => {
        setPersistenPokemonFighter({ player1: playerData.player1, player2: playerData.player2 })
        navigate('/fade')
    }


    return (
        <div>
            {isLoading ?
                (
                    <LoadingPokeball />
                ) :
                (
                    <div className='max-h-screen grid grid-rows-[auto_2fr_2fr] mb-3'>

                        <h1 className='text-5xl text-center p-2 font-pokemon-solid mb-4'>
                            Pokemon Battler
                        </h1>

                        <div className='grid grid-cols-[1fr_auto_1fr] gap-3 px-2'>
                            <motion.div
                                className={`drop-shadow-lg ${activePlayer === 1 ? 'animate-up' : 'animate-down'}`}
                                initial={{ scale: activePlayer === 1 ? 1 : 0.9 }} // Initial position based on active player
                                animate={{ scale: activePlayer === 1 ? 1 : 0.9 }} // Animation based on active player
                                transition={{ duration: 0.3 }} // Animation duration in seconds
                                ref={scope}
                            >
                                {playerData?.player1 && (
                                    <PokemonCard playerNum={1} pokemon={playerData.player1} />
                                )}
                            </motion.div>

                            <div className='self-center justify-center text-5xl flex flex-col'>
                                <button onClick={startBattle}
                                    className='border-2 border-green-500 bg-green-500/10 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white active:bg-green-400 md:mx-auto'>
                                    Battle!
                                </button>
                                <div className='text-center'>
                                    VS
                                </div>
                                <button
                                    onClick={handleChangeActivePlayer}
                                    className='border-2 border-pink-500 bg-pink-500/10 px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white active:bg-pink-400 md:mx-auto'>
                                    {activePlayer === 1 ? (
                                        <span dangerouslySetInnerHTML={{ __html: "&larr;" }} />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: "&rarr;" }} />
                                    )}
                                </button>
                            </div>

                            <motion.div
                                className={`drop-shadow-lg ${activePlayer === 2 ? 'animate-up' : 'animate-down'}`}
                                initial={{ scale: activePlayer === 2 ? 1 : 0.9 }} // Initial position based on active player
                                animate={{ scale: activePlayer === 2 ? 1 : 0.9 }} // Animation based on active player
                                transition={{ duration: 0.3 }} // Animation duration in seconds
                                ref={scope}
                            >
                                {playerData?.player2 && (
                                    <PokemonCard playerNum={2} pokemon={playerData.player2} />
                                )}
                            </motion.div>

                        </div>

                        <PokemonPickerList playerNum={activePlayer} />

                    </div>
                )
            }
        </div>
    )
}

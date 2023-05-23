import { useEffect, useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { usePokemonBattle } from '../hooks/useBattle'

import { capitalize } from '../utils/helperFunctions'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'
import { getEmoji } from '../utils/getEmoji'
import { changeBackground } from '../utils/changeBackground'

import { motion } from 'framer-motion'

const BattlePage = () => {
    // Hook to navigate to a different page
    const navigate = useNavigate()

    const { persistenPokemonFighter, setPersistenPokemonFighter } = useStorage()

    // Battle hook with functions that alter GlobalPlayerData context
    const { attack, checkWinner, isWinner, attackResponse } = usePokemonBattle()

    // Custom hook returning global player context reducer
    const { playerData, playerDispatch } = useGlobalPlayerData()

    const { player1, player2 } = playerData

    // ====== Local State ======
    const [activePlayerTurn, setActivePlayerTurn] = useState(1)
    const [move, setMove] = useState({})

    const [blinking, setBlinking] = useState(false)

    // Random coin toss to see which player goes first
    const randomPlayerFirst = () => {
        return Math.random() > 0.5
            ? { attacker: player1, defender: player2 }
            : { attacker: player2, defender: player1 }
    }

    // local state to store who is the defender and who is the attacker
    const [round, setRound] = useState(randomPlayerFirst)

    // attempt at trying to set the HP bar to the 100% of the HP - needs work
    const calculateHPBar = (stats) => {
        return Math.floor((stats.battleHP / stats.hp) * 100)
    }

    // the move state is updated when a player presses a move button
    // this will be when we call the attack function
    // useEffect(() => {
    //     // Check the move has a value, refreshing the page will remove the state data
    //     if (move?.name) {
    //         // apply the correct attack function arguments
    //         // depending on whose turn it is
    //         if (activePlayerTurn === 1) {
    //             attack(move, player1, player2, 1)
    //         } else if (activePlayerTurn === 2) {
    //             attack(move, player2, player1, 2)
    //         }

    //         setActivePlayerTurn(activePlayerTurn === 1 ? 2 : 1)


    //         // After attack swap the roles
    //         setRound({ attacker: round.defender, defender: round.attacker })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [move])
    const pause = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleMoveSelect = async (move) => {
        if (move?.name) {
            // apply the correct attack function arguments
            // depending on whose turn it is
            if (activePlayerTurn === 1) {
                attack(move, player1, player2, 1)
            } else if (activePlayerTurn === 2) {
                attack(move, player2, player1, 2)
            }

            setActivePlayerTurn(activePlayerTurn === 1 ? 2 : 1)
        
            setBlinking(true)
            // wait one second
            await pause(1000)
            setBlinking(false)

            // After attack swap the roles
            setRound({ attacker: round.defender, defender: round.attacker })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }


    // My attempt at having local storage
    // useEffect(() => {
    //     if (Object.keys(persistenPokemonFighter).length) {
    //         playerDispatch({ type: 'setup', payload: persistenPokemonFighter[0] })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // useEffect(() => {
    //     setPersistenPokemonFighter([playerData, activePlayerTurn])
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [playerData])

    // button to return to home page
    const handleEndGame = () => {
        navigate('/')
    }

    return (
        <div className='h-screen bg-blue-100 grid grid-rows-[3fr_1fr] overflow-hidden'>
            <button
                onClick={handleEndGame}
                className='absolute top-2 left-2 z-10 border-2 border-pink-500 bg-pink-500/10 px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white active:bg-pink-400 md:mx-auto'
            >
                Go back
            </button>

            {/* POKEMON DISPLAY */}
            <div className='bg-cyan-200 grid grid-rows-2'>
                {/* DEFENDER */}
                <div className='grid grid-cols-2'>
                    {/* NAME AND HP */}
                    <motion.div
                        className='relative'
                        initial={{ x: -2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2, delay: 1.5 }}
                    >
                        <div className='absolute w-4/5 top-[20%] left-[25%] border-8 border-gray-700 bg-orange-200 p-2 space-y-1 rounded-md rounded-bl-3xl rounded-tr-3xl'>
                            <p className='text-3xl font-bold'>
                                {capitalize(round.defender.name)}
                            </p>
                            {/* HP BAR */}
                            <div className='flex items-center gap-2 bg-gray-700 rounded px-1'>
                                <span className='text-amber-500 font-bold'>
                                    HP
                                </span>
                                <div className='bg-red-200 h-4 rounded w-full relative'>
                                    <span
                                        className={`bg-red-500 h-4 rounded w-[${calculateHPBar(
                                            round.defender.stats
                                        )}%] absolute`}
                                    ></span>
                                </div>
                                {/* <span className='bg-red-500 h-4 rounded w-full'></span> */}
                            </div>
                            {/* HP VALUES */}
                            <p className='font-bold text-right'>
                                {round.defender.stats.battleHP} /{' '}
                                {round.defender.stats.hp}
                            </p>
                        </div>
                    </motion.div>
                    {/* SPRITE */}
                    <motion.div
                        className='bg-cyan-300 grid place-items-center'
                        // initial={{ opacity: 0, scale: 0.5, x: -2000 }}
                        initial={{ x: -2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <img
                            src={round.defender.sprites.front}
                            alt=''
                            className={`w-1/2 ${blinking && 'blink'}`}
                        />
                    </motion.div>
                </div>

                {/* ATTACKER */}
                <div className='grid grid-cols-2'>
                    {/* SPRITE */}
                    <motion.div
                        className='bg-cyan-300 grid place-items-center'
                        initial={{ x: 2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <img
                            src={round.attacker.sprites.back}
                            alt=''
                            className='w-1/2'
                        />
                    </motion.div>
                    {/* NAME AND HP */}
                    <motion.div
                        className='relative'
                        initial={{ x: 2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2, delay: 1.5 }}
                    >
                        <div className='absolute w-4/5 top-[20%] right-[25%] border-8 border-gray-700 bg-orange-200 p-2 space-y-1 rounded rounded-tl-3xl rounded-br-3xl'>
                            <p className='text-3xl font-bold'>
                                {capitalize(round.attacker.name)}
                            </p>
                            {/* HP BAR */}
                            <div className='flex items-center gap-2 bg-gray-700 rounded px-1'>
                                <span className='text-amber-500 font-bold'>
                                    HP
                                </span>
                                <span className='bg-red-500 h-4 rounded w-full'></span>
                            </div>
                            {/* HP VALUES */}
                            <p className='font-bold text-right'>
                                {round.attacker.stats.battleHP} /{' '}
                                {round.attacker.stats.hp}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* BATTLE UI */}
            <div className='bg-cyan-500 grid grid-cols-2'>
                <div className='m-2 border-8 border-amber-700 bg-slate-200 rounded-xl flex items-center justify-center'>
                    <div className='text-3xl font-extrabold'>
                        {attackResponse}
                    </div>
                </div>

                <div className='grid grid-cols-2'>
                    {round.attacker.moves.map((move, index) => (
                        <button
                            key={index}
                            className={`flex items-center justify-center gap-2 border-4 border-black rounded-3xl m-3 text-3xl uppercase text-black ${changeBackground(
                                move.type
                            )} `}
                            // onClick={() => setMove(move)}
                            onClick={() => handleMoveSelect(move)}
                        >
                            <span>{capitalize(move.name)}</span>
                            <span>{getEmoji(move.type)}</span>
                            <span>{move.power}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default BattlePage

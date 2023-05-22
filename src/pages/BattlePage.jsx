import { useEffect, useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { usePokemonBattle } from '../hooks/useBattle'

import { capitalize } from '../utils/helperFunctions'
import { useNavigate } from 'react-router-dom'

const BattlePage = () => {
    const navigate = useNavigate()
    // Battle hook with functions that alter GlobalPlayerData context
    const { attack, checkWinner, isWinner, attackResponse } = usePokemonBattle()

    // Custom hook returning global context reducer
    const { playerData, playerDispatch } = useGlobalPlayerData()

    const { player1, player2 } = playerData

    // ====== Local State ======
    const [activePlayerTurn, setActivePlayerTurn] = useState(1)
    const [approveTurn, setApproveTurn] = useState(false)
    const [move, setMove] = useState({})

    const randomPlayerFirst = () => {
        return Math.random() > 0.5 ? { attacker: player1, defender: player2 } : { attacker: player2, defender: player1 }
    }
    const [round, setRound] = useState(randomPlayerFirst)

    const calculateHPBar = (stats) => {
        return Math.floor((stats.battleHP / stats.hp) * 100)
    }


    const handleMoveClick = (move) => {
        if (activePlayerTurn === 1) {
            attack(move, player1, player2, 1)
        } else if (activePlayerTurn === 2) {
            attack(move, player2, player1, 2)
        }
    }

    useEffect(() => {
        console.log("useEffect move")
        if (move?.name) {
            if (activePlayerTurn === 1) {
                attack(move, player1, player2, 1)
            } else if (activePlayerTurn === 2) {
                attack(move, player2, player1, 2)
            }
        }
    }, [move])

    const handleEndGame = () => {
        navigate('/')
    }

    return (
        <div className='h-screen bg-blue-100 grid grid-rows-[3fr_1fr]'>
            <button
                onClick={handleEndGame}
                className='border-2 border-pink-500 bg-pink-500/10 px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white active:bg-pink-400 md:mx-auto'
            >
                Go back
            </button>


            {/* POKEMON DISPLAY */}
            <div className='bg-cyan-200 grid grid-rows-2'>
                <div className='grid grid-cols-2'>
                    <div className='relative'>
                        <div className='absolute w-4/5 top-[20%] left-[25%] border-8 border-gray-700 rounded bg-orange-200 p-2 space-y-1 '>
                            <p className='text-3xl font-bold'>
                                {capitalize(round.defender.name)}
                            </p>
                            <div className='flex items-center gap-2 bg-gray-700 rounded px-1'>
                                <span className='text-amber-500 font-bold'>
                                    HP
                                </span>
                                <div className='bg-red-200 h-4 rounded w-full relative'>
                                    <span className={`bg-red-500 h-4 rounded w-[${calculateHPBar(round.defender.stats)}%] absolute`}></span>
                                </div>
                                {/* <span className='bg-red-500 h-4 rounded w-full'></span> */}
                            </div>
                        </div>
                    </div>
                    <div className='bg-cyan-300 grid place-items-center'>
                        <img
                            src={player2.sprites.front}
                            alt=''
                            className='w-1/2'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-2'>
                    <div className='bg-cyan-300 grid place-items-center'>
                        <img
                            src={player1.sprites.back}
                            alt=''
                            className='w-1/2'
                        />
                    </div>
                    <div className='relative'>
                        <div className='absolute w-4/5 top-[20%] right-[25%] border-8 border-gray-700 rounded bg-orange-200 p-2 space-y-1 '>
                            <p className='text-3xl font-bold'>
                                {capitalize(player1.name)}
                            </p>
                            <div className='flex items-center gap-2 bg-gray-700 rounded px-1'>
                                <span className='text-amber-500 font-bold'>
                                    HP
                                </span>
                                <span className='bg-red-500 h-4 rounded w-full'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BATTLE UI */}
            <div className='bg-cyan-500 grid grid-cols-2'>
                <div className='m-2 border-8 border-amber-700 bg-slate-200 rounded-xl'>
                    <div>{attackResponse}</div>

                </div>

                <div className='grid grid-cols-2'>
                    {playerData[`player${activePlayerTurn}`].moves.map(
                        (move, index) => (
                            <button
                                key={index}
                                className='border-4 border-white rounded-3xl m-3 text-3xl uppercase font-bold text-white'
                                onClick={() => setMove(move)}
                            >
                                {capitalize(move.name)}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
export default BattlePage

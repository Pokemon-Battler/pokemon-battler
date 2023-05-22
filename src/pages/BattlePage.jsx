import { useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { usePokemonBattle } from '../hooks/useBattle'

import { capitalize } from '../utils/helperFunctions'

const BattlePage = () => {
    // Battle hook with functions that alter GlobalPlayerData context
    const { attack, checkWinner, isWinner, attackResponse } = usePokemonBattle()

    // Custom hook returning global context reducer
    const { playerData, playerDispatch } = useGlobalPlayerData()

    const { player1, player2 } = playerData

    // ====== Local State ======
    const [activePlayerTurn, setActivePlayerTurn] = useState(1)



    const handleMoveClick = () => {

    }

    return (
        <div className='h-screen bg-blue-100 grid grid-rows-[3fr_1fr]'>
            {/* POKEMON DISPLAY */}
            <div className='bg-cyan-200 grid grid-rows-2'>
                <div className='grid grid-cols-2'>
                    <div className='relative'>
                        <div className='absolute w-4/5 top-[20%] left-[25%] border-8 border-gray-700 rounded bg-orange-200 p-2 space-y-1 '>
                            <p className='text-3xl font-bold'>
                                {capitalize(player2.name)}
                            </p>
                            <div className='flex items-center gap-2 bg-gray-700 rounded px-1'>
                                <span className='text-amber-500 font-bold'>
                                    HP
                                </span>
                                <span className='bg-red-500 h-4 rounded w-full'></span>
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

                </div>

                <div className='grid grid-cols-2'>
                    {playerData[`player${activePlayerTurn}`].moves.map(
                        (move, index) => (
                            <button
                                key={index}
                                className='border-4 border-white rounded-3xl m-3 text-3xl uppercase font-bold text-white'
                                onClick={handleMoveClick}
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

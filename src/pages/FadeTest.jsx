import { useEffect, useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { usePokemonBattle } from '../hooks/useBattle'

import { capitalize, pickRandom } from '../utils/helperFunctions'

import { useNavigate } from 'react-router-dom'
import { getEmoji } from '../utils/getEmoji'
import { changeBackground } from '../utils/changeBackground'
import { motion, useSpring } from 'framer-motion'

import bgImage from '../images/backgrounds/1.png'
// const randomNumber = Math.floor(Math.random() * 3)

const FadeTest = () => {
    // Hook to navigate to a different page
    const navigate = useNavigate()

    // Battle hook with functions that alter GlobalPlayerData context
    const { attack, attackResponse, setAttackResponse } = usePokemonBattle()

    // Custom hook returning global player context reducer
    const { playerData } = useGlobalPlayerData()
    const { player1, player2 } = playerData

    // ====== Local State ======
    const [activePlayerTurn, setActivePlayerTurn] = useState(1)
    const [move, setMove] = useState({})

    // animation states
    const [isDefenderBlinking, setIsDefenderBlinking] = useState(false)
    const [isFading, setIsFading] = useState(false)
    const [defenderHpNormalized, setDefenderHpNormalized] = useState(1)
    const [attackerHpNormalized, setAttackerHpNormalized] = useState(1)

    // local state to store who is the defender and who is the attacker
    const [round, setRound] = useState({ attacker: player1, defender: player2 })

    // attempt at trying to set the HP bar to the 100% of the HP - needs work
    const calculateHPNormalized = (stats) => {
        return stats.battleHP / stats.hp
    }

    // these aren't used yet
    const defenderHpBar = useSpring(defenderHpNormalized, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.002,
    })

    const attackerHpBar = useSpring(attackerHpNormalized, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.002,
    })

    // Pause function
    const pause = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    // Check if there is a winner
    const checkWinner = () => {
        const { player1, player2 } = playerData

        if (player1.stats.battleHP <= 0) {
            return { winner: player1, loser: player2 }
        } else if (player2.stats.battleHP <= 0) {
            return { winner: player2, loser: player1 }
        } else {
            return false
        }
    }


    // Generate the HP bar
    useEffect(() => {
        setDefenderHpNormalized(calculateHPNormalized(round.defender.stats))
        setAttackerHpNormalized(calculateHPNormalized(round.attacker.stats))
    }, [move, round])

    // check if there is a winner, if there is then fade out and navigate to the winner page
    useEffect(() => {
        let winObject = checkWinner()

        if (winObject) {
            setAttackResponse('GAME OVER: ' + winObject.loser.name + ' fainted!')
            setIsFading(true)
            pause(4000)
                .then(navigate('/winner', { state: { winner: winObject.winner } }))
        }

        // if no winner then prompt the player for their next turn
        pause(600).then(() => setAttackResponse(`${capitalize(round.attacker.name)}'s turn!`))
    }, [round])

    // Handle move button click to apply the attack logic
    const handleMoveSelect = async (move) => {
        if (move?.name) {
            setMove(move)
            // apply the correct attack function arguments
            // depending on whose turn it is
            if (activePlayerTurn === 1) {
                attack(move, player1, player2, 2)
            } else if (activePlayerTurn === 2) {
                attack(move, player2, player1, 1)
            }

            // toggle the active player number
            setActivePlayerTurn(activePlayerTurn === 1 ? 2 : 1)

            // damage receive animation
            if (attackResponse !== "Attack missed!") {
                setIsDefenderBlinking(true)
                await pause(1000)
                setIsDefenderBlinking(false)
            }

            // fade animation between rounds
            setIsFading(true)

            // Pause for fade to complete
            await pause(300)

            // After attack swap the roles
            setRound({ attacker: round.defender, defender: round.attacker })
            setAttackResponse(`${capitalize(round.defender.name)}'s turn!`)

            // Pause for fade to complete
            await pause(300)

            setIsFading(false)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    // button to return to home page
    const handleEndGame = () => {
        navigate('/')
    }

    return (
        <div className='h-screen  grid grid-rows-[3fr_1fr] overflow-hidden'>
            <button
                onClick={handleEndGame}
                className='absolute top-2 left-2 z-10 border-2 border-pink-500 bg-pink-500/10 px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white active:bg-pink-400 md:mx-auto'
            >
                Go back
            </button>

            {/* POKEMON DISPLAY */}
            <div className='grid grid-rows-2' style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                {/* DEFENDER */}
                <div className='grid grid-cols-2'>
                    {/* NAME AND HP */}
                    <motion.div
                        className='relative'
                        initial={{ x: -2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2, delay: 1.5 }}
                    >
                        <div className={`absolute w-4/5 top-[20%] left-[25%] border-8 border-gray-700 bg-orange-200 p-2 space-y-1 rounded-md rounded-bl-3xl rounded-tr-3xl transition-opacity ease-in-out duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
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
                                        className={`bg-red-500 h-4 absolute`}
                                        style={{
                                            width: `${Math.floor(
                                                defenderHpNormalized * 100
                                            )}%`,
                                        }}
                                    // style={{ defenderHpBar }}
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
                        className='grid place-items-center'
                        // initial={{ opacity: 0, scale: 0.5, x: -2000 }}
                        initial={{ x: -2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <img
                            src={round.defender.sprites.aniFront}
                            alt=''
                            className={`${isDefenderBlinking && 'blink'} w-1/5 transition-opacity ease-in-out duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </motion.div>
                </div>

                {/* ATTACKER */}
                <div className='grid grid-cols-2'>
                    {/* SPRITE */}
                    <motion.div
                        className='grid place-items-center'
                        initial={{ x: 2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <img
                            src={round.attacker.sprites.aniBack}
                            alt=''
                            className={`w-1/5 transition-opacity ease-in-out duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </motion.div>
                    {/* NAME AND HP */}
                    <motion.div
                        className='relative'
                        initial={{ x: 2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 2, delay: 1.5 }}
                    >
                        <div className={`absolute w-4/5 top-[20%] right-[25%] border-8 border-gray-700 bg-orange-200 p-2 space-y-1 rounded rounded-tl-3xl rounded-br-3xl transition-opacity ease-in-out duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                            <p className='text-3xl font-bold'>
                                {capitalize(round.attacker.name)}
                            </p>
                            {/* HP BAR */}
                            <div className='flex items-center gap-2 bg-gray-700 rounded px-1'>
                                <span className='text-amber-500 font-bold'>
                                    HP
                                </span>
                                <div className='bg-red-200 h-4 rounded w-full relative'>
                                    <span
                                        className={`bg-red-500 h-4 absolute`}
                                        style={{
                                            width: `${Math.floor(
                                                attackerHpNormalized * 100
                                            )}%`,
                                        }}
                                    // style={{ defenderHpBar }}
                                    ></span>
                                </div>
                                {/* <span className='bg-red-500 h-4 rounded w-full'></span> */}
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
                    <div className={`text-3xl font-gameboy -tracking-wide font-extrabold transition-opacity ease-in-out duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        {attackResponse}
                    </div>
                </div>

                <div className='grid grid-cols-2'>
                    {round.attacker.moves.map((move, index) => (
                        <button
                            key={index}
                            className={`flex items-center justify-center gap-2 border-4 border-black rounded-3xl m-3 text-2xl uppercase text-black ${changeBackground(
                                move.type
                            )} transition-opacity ease-in-out duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
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
export default FadeTest

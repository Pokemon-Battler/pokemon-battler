import { useGlobalPokemonData } from '../context/globalPokemonList'
import { useGlobalFighterData } from '../context/globalFighterData'

import { capitalize } from '../utils/helperFunctions'

const FightPage = () => {
    const { fighterData, fighterDispatch } = useGlobalFighterData()
    const { pokemonList, setPokemonList } = useGlobalPokemonData()

    // const fighter1Id = fighterData.fighter1.id
    // const fighter2Id = fighterData.fighter2.id

    // const fighter1PokemonData = pokemonList[fighter1Id]
    // const fighter2PokemonData = pokemonList[fighter2Id]

    const { fighter1, fighter2 } = fighterData

    // const fighter1Image = fighter1.sprites.back
    // const fighter2Image = fighter2.sprites.front
    // console.log(fighter1Image)

    return (
        <div className='h-screen bg-blue-100 grid grid-rows-[70vh_30vh]'>
            <div className='bg-cyan-200 grid grid-rows-2'>
                <div className='grid grid-cols-2'>
                    <div className="relative">
                        <div className='absolute w-4/5 top-[20%] left-[25%] border-8 border-gray-700 rounded bg-orange-200 p-2 space-y-1 '>
                            <p className='text-3xl font-bold'>
                                {capitalize(fighter2.name)}
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
                        <img src={fighter2.sprites.front} alt='' className='w-1/2' />
                    </div>
                </div>

                <div className='grid grid-cols-2'>
                    <div className='bg-cyan-300 grid place-items-center'>
                        <img src={fighter1.sprites.back} alt='' className='w-1/2' />
                    </div>
                    <div className="relative">
                        <div className='absolute w-4/5 top-[20%] right-[25%] border-8 border-gray-700 rounded bg-orange-200 p-2 space-y-1 '>
                            <p className='text-3xl font-bold'>
                                {capitalize(fighter1.name)}
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
            <div className='bg-cyan-500'></div>
        </div>
    )
}
export default FightPage

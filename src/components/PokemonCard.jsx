import { useEffect } from 'react'

import { useGlobalPokemonData } from '../context/globalPokemonList'

import { capitalize } from '../utils/helperFunctions'

const PokemonCard = ({ fighterNum, pokemonId }) => {
    const { pokemonList, setPokemonList } = useGlobalPokemonData()

    const fighter = pokemonList[pokemonId] || null

    return (
        <div className='border rounded bg-emerald-200/10'>
            {fighter && (
                <div className="flex flex-col items-center ">
                    <h2>Fighter {fighterNum}</h2>
                    <p className='text-4xl font-bold'>
                        {capitalize(fighter.name)}
                    </p>
                    <img src={fighter.sprites.front_default} alt='pokemon fighter' />
                </div>
            )}
        </div>
    )
}
export default PokemonCard

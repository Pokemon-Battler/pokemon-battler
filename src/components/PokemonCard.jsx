import { useEffect } from 'react'

import { useGlobalPokemonData } from '../context/globalPokemonList'

import { capitalize } from '../utils/helperFunctions'

const PokemonCard = ({ fighterNum, pokemonId }) => {
    const { pokemonList, setPokemonList } = useGlobalPokemonData()

    const fighter = pokemonList[pokemonId] || null
    const hp = fighter?.stats[0].base_stat

    return (
        <div className='border rounded bg-purple-500/10'>
            {fighter && (
                <div className='flex flex-col gap-2 px-2'>
                    <div className='flex items-center justify-between'>
                        <p>Fighter {fighterNum}</p>
                        <p className='text-4xl font-semibold'>
                            {capitalize(fighter.name)}
                        </p>
                        <div className='space-x-1'>
                            <span className='font-bold text-xs'>HP</span>
                            <span className='font-semibold text-4xl'>{hp}</span>
                        </div>
                    </div>

                    <div className=''>
                        <img
                            src={fighter.sprites.front_default}
                            alt='pokemon fighter'
							className='w-1/2 mx-auto border-2 rounded '
                        />
                    </div>

					<div>
						{/* {fighter.abilities[0].name} */}
						{fighter?.abilities.map((ability, index) => (
							<div key={index} className='text-center p-4 border'>
								{capitalize(ability.ability.name)}
							</div>
						))}
					</div>

					<div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-2">
						{fighter?.stats.slice(1).map((stat, index) => (
							<div key={index} className="p-1 border rounded">
								<span>{capitalize(stat.stat.name)}: </span>
								<span>{stat.base_stat}</span>
							</div>
						))}
					</div>

                </div>
            )}
        </div>
    )
}
export default PokemonCard

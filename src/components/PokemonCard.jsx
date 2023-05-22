import { capitalize } from '../utils/helperFunctions'

const PokemonCard = ({ playerNum, pokemon }) => {
    return (
        <div className='border rounded bg-purple-500/10'>
            {pokemon && (
                <div className='flex flex-col gap-2 px-2'>
                    <div className='flex items-center justify-between'>
                        <p>Player {playerNum}</p>
                        <p className='text-4xl font-semibold'>
                            {capitalize(pokemon.name)}
                        </p>
                        <div className='space-x-1'>
                            <span className='font-bold text-xs'>HP</span>
                            <span className='font-semibold text-4xl'>{pokemon.stats.hp}</span>
                        </div>
                    </div>

                    <div className=''>
                        <img
                            src={pokemon.sprites.highRes}
                            alt='pokemon fighter'
                            className='w-1/2 mx-auto border-2 rounded '
                        />
                    </div>

                    <div>
                        {pokemon.abilities.map((ability, index) => (
                            <div key={index} className='text-center p-4 border'>
                                {capitalize(ability)}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-2">
                        {Object.entries(pokemon.stats).slice(1).map(([key, value]) => (
                            <div key={key} className="p-1 border rounded">
                                <span>{capitalize(key)}: </span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    )
}
export default PokemonCard

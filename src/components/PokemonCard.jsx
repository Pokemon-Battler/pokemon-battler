import { capitalize } from '../utils/helperFunctions'
import { getEmoji } from '../utils/getEmoji'
import { changeBackground } from '../utils/changeBackground'

const PokemonCard = ({ playerNum, pokemon }) => {

    const containerClass = () => {
        let border = playerNum === 1 ? 'border-red-600 border-2' : 'border-blue-600 border-2'

        return `${border} rounded`
    }

    function getClassName() {
        return `${containerClass()} ${changeBackground(pokemon.types[0])}`
    }


    return (
        <div className={getClassName()}>
            {pokemon && (
                <div className='flex flex-col gap-2 px-2 relative'>
                    <div className='flex items-center justify-between'>
                        <p>Player {playerNum}</p>
                        <p className='text-4xl font-semibold'>
                            {capitalize(pokemon.name)}
                        </p>
                        <div className='space-x-1'>
                            <span className='font-bold text-xs'>HP</span>
                            <span className='font-semibold text-4xl'>{pokemon.stats.hp}</span>
                            <span className='text-4xl'>{getEmoji(pokemon.types[0])}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 absolute translate-y-20">
                        <div><span className="font-bold">Height: </span>{pokemon.height}</div>
                        <div><span className="font-bold">Weight: </span>{pokemon.weight}{pokemon.weight > 1 ? 'kgs' : 'kg'}</div>
                        <div><span className="font-bold">Types: </span>{capitalize(pokemon.types[0])}{pokemon.types[1] ? `, ${capitalize(pokemon.types[1])}` : ''}</div>
                    </div>

                    <div>
                        <img
                            src={pokemon.sprites.highRes}
                            alt='pokemon fighter'
                            className={`w-2/5 mx-auto rounded bg-gradient-to-br from-${changeBackground(pokemon.types[0])} to-slate-600`} />
                    </div>

                    <div className='flex flex-row text-center gap-2'>
                        <div className="font-bold">Moves: </div>
                        {pokemon.moves.map((move, index) => (
                            <div key={index} className=''>
                                {capitalize(move.name)} {getEmoji(move.type)}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 grid-rows-1 grid-flow-col gap-2">
                        {Object.entries(pokemon.stats).slice(1).map(([key, value]) => {
                            if (key !== 'special-attack' && key !== 'special-defense' && key !== 'hp') {
                                return (<div key={key} className="p-1 rounded">
                                    <span className="font-bold">{capitalize(key)}: </span>
                                    <span>{value}</span>
                                </div>)
                            } else {
                                return null
                            }
                        })}
                    </div>



                </div>
            )}
        </div>
    )
}
export default PokemonCard

import { capitalize } from '../utils/helperFunctions'

const PokemonCard = ({ playerNum, pokemon }) => {

    const changeBackground = (type, weight) => {
        let background = ''
        switch (type) {
            case 'normal':
                background = `bg-coolGray-${weight}`
                break
            case 'fighting':
                background = `bg-red-${weight}`
                break
            case 'flying':
                background = `bg-blue-${weight}`
                break
            case 'poison':
                background = `bg-purple-${weight}`
                break
            case 'ground':
                background = `bg-yellow-${weight}`
                break
            case 'rock':
                background = `bg-trueGray-${weight}`
                break
            case 'bug':
                background = `bg-green-${weight}`
                break
            case 'ghost':
                background = `bg-indigo-${weight}`
                break
            case 'steel':
                background = `bg-gray-${weight}`
                break
            case 'fire':
                background = `bg-red-${weight}`
                break
            case 'water':
                background = `bg-blue-${weight}`
                break
            case 'grass':
                background = `bg-green-${weight}`
                break
            case 'electric':
                background = `bg-yellow-${weight}`
                break
            case 'psychic':
                background = `bg-pink-${weight}`
                break
            case 'ice':
                background = `bg-blue-${weight}`
                break
            case 'dragon':
                background = `bg-purple-${weight}`
                break
            case 'dark':
                background = `bg-trueGray-${weight}`
                break
            case 'fairy':
                background = `bg-pink-${weight}`
                break
            case 'unknown':
                background = `bg-coolGray-${weight}`
                break
            case 'shadow':
                background = `bg-coolGray-${weight}`
                break
            default:
                break
        }
        return background
    }

    const getEmoji = (type) => {
        switch (type) {
            case 'normal':
                return '⚪️'
            case 'fighting':
                return '🥊'
            case 'flying':
                return '🦅'
            case 'poison':
                return '☠️'
            case 'ground':
                return '⛰️'
            case 'rock':
                return '🪨'
            case 'bug':
                return '🐛'
            case 'ghost':
                return '👻'
            case 'steel':
                return '🔩'
            case 'fire':
                return '🔥'
            case 'water':
                return '💧'
            case 'grass':
                return '🌱'
            case 'electric':
                return '⚡'
            case 'psychic':
                return '🔮'
            case 'ice':
                return '❄️'
            case 'dragon':
                return '🐉'
            case 'dark':
                return '🌑'
            case 'fairy':
                return '🧚'
            case 'unknown':
                return '❓'
            case 'shadow':
                return '🌑'
            default:
                return '❓'
        }
    }

    const containerClass = () => {
        let border = playerNum === 1 ? 'border-red-600 border-2' : 'border-blue-600 border-2'

        return `${border} border rounded bg-purple-500/10`
    }


    return (
        <div className={`${changeBackground(pokemon.types[0], 400)} ${containerClass()}`}>
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
                    </div>

                    <div>
                        <img
                            src={pokemon.sprites.highRes}
                            alt='pokemon fighter'
                            className={changeBackground(pokemon.types[0], 200) + ' w-2/5 mx-auto rounded'}
                        />
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
                            }
                        })}
                    </div>



                </div>
            )}
        </div>
    )
}
export default PokemonCard

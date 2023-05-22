import { capitalize } from '../utils/helperFunctions'

const PokemonCard = ({ playerNum, pokemon }) => {

    const changeBackground = (type) => {
        let background = ''
        switch (type) {
            case 'normal':
                background = `gray-200`
                break
            case 'fighting':
                background = `red-200`
                break
            case 'flying':
                background = `sky-100`
                break
            case 'poison':
                background = `purple-200`
                break
            case 'ground':
                background = `amber-200`
                break
            case 'rock':
                background = `orange-200`
                break
            case 'bug':
                background = `emerald-200`
                break
            case 'ghost':
                background = `indigo-200`
                break
            case 'steel':
                background = `slate-200`
                break
            case 'fire':
                background = `red-200`
                break
            case 'water':
                background = `blue-200`
                break
            case 'grass':
                background = `green-200`
                break
            case 'electric':
                background = `yellow-200`
                break
            case 'psychic':
                background = `pink-200`
                break
            case 'ice':
                background = `cyan-100`
                break
            case 'dragon':
                background = `violet-200`
                break
            case 'dark':
                background = `gray-400`
                break
            case 'fairy':
                background = `pink-200`
                break
            case 'unknown':
                background = `zinc-200`
                break
            case 'shadow':
                background = `slate-200`
                break
            default:
                break
        }
        console.log(background)
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

        return `${border} rounded`
    }

    function test() {
        console.log(`${containerClass()} bg-${changeBackground(pokemon.types[0])}`)
        return String(`${containerClass()} bg-${changeBackground(pokemon.types[0])}`)
    }


    return (
        <div className={test()}>
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
                            className={`w-2/5 mx-auto rounded bg-gradient-to-br from-${changeBackground(pokemon.types[0])} to-slate-600`}
                        // className={changeBackground(pokemon.types[0], 200) + ' w-2/5 mx-auto rounded'}
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

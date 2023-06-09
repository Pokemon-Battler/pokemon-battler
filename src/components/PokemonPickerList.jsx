import { useGlobalPokemonData } from '../context/globalPokemonList'
import { capitalize } from '../utils/helperFunctions'
import { useGlobalPlayerData } from '../context/globalPlayerData'


const PokemonPickerList = ({ playerNum }) => {
    const { pokemonList } = useGlobalPokemonData()
    const { playerData, playerDispatch } = useGlobalPlayerData()


    // Need to do [id - 1] because the pokemonList is 0-indexed
    const handleSelect = (id) => {
        playerDispatch({ type: 'set', player: playerNum, payload: pokemonList[id - 1] })
    }

    // update picker div borders based on selection
    const checkSelection = (id) => {
        let borderColor = ''

        if (playerData?.player1?.id === id && playerData?.player2?.id === id) {
            borderColor = 'border-purple-600 '
        } else if (playerData?.player1?.id === id) {
            borderColor = 'border-red-600 '
        } else if (playerData?.player2?.id === id) {
            borderColor = 'border-blue-600 '
        } else {
            borderColor = 'border-black/0' // so the border still takes up space and doesn't cause a shift when selected
        }
        // 
        return `border-4 ${borderColor} flex items-center justify-center rounded-lg bg-teal-500/10 hover:bg-teal-500/30`
    }


    return (
        <div className='grid grid-cols-4 gap-2 p-2 mt-4 overflow-y-scroll border rounded-lg bg-white/60'>
            {pokemonList &&
                pokemonList.map((pokemon, index) => (
                    <div
                        key={index}
                        className={checkSelection(pokemon.id)}
                        onClick={() => handleSelect(pokemon.id)}
                    >
                        <p>{capitalize(pokemon.name)}</p>
                        <img
                            src={pokemon.sprites.front}
                            alt='pokemon default'
                        />
                    </div>
                ))}
        </div>
    )
}
export default PokemonPickerList

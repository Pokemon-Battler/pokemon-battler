import { useGlobalPokemonData } from '../context/globalPokemonList'
import { capitalize } from '../utils/helperFunctions'
import { useGlobalPlayerData } from '../context/globalPlayerData'


const PokemonPickerList = ({ playerNum }) => {

    // Should pass the list down as prop? 
    // The point of the global context is that we don't need to and can just use the hook here right? - Matt: yep, we can use the global context here
    const { pokemonList } = useGlobalPokemonData()
    const { playerDispatch } = useGlobalPlayerData()

    // Need to do [id - 1] because the pokemonList is 0-indexed
    const handleSelect = (id) => {
        playerDispatch({ type: 'update', player: playerNum, payload: pokemonList[id - 1] })
    }

    return (
        <div className='grid grid-cols-4 gap-2 p-2 overflow-y-scroll'>
            {pokemonList &&
                pokemonList.map((pokemon, index) => (
                    <div
                        key={index}
                        className='flex items-center justify-center rounded bg-red-500/10 hover:bg-red-500/20'
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

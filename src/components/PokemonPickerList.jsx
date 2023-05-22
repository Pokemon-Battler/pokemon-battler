import { useGlobalPokemonData } from '../context/globalPokemonList'
import { capitalize } from '../utils/helperFunctions'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { useEffect, useState } from 'react'


const PokemonPickerList = ({ playerNum }) => {
    const { pokemonList } = useGlobalPokemonData()
    const { playerData, playerDispatch } = useGlobalPlayerData()
    const [classNames, setClassNames] = useState('flex items-center justify-center rounded bg-red-500/10 hover:bg-red-500/20');


    // Need to do [id - 1] because the pokemonList is 0-indexed
    const handleSelect = (id) => {
        playerDispatch({ type: 'update', player: playerNum, payload: pokemonList[id - 1] })
    }

    // update picker div borders based on selection
    const checkSelection = (id) => {
        let border = ''

        if (playerData.player1.id === id && playerData.player2.id === id) {
            border = 'border-purple-600 border-2 '
        } else if (playerData.player1.id === id) {
            border = 'border-red-600 border-2 '
        } else if (playerData.player2.id === id) {
            border = 'border-blue-600 border-2 '
        }
        return `${border}flex items-center justify-center rounded bg-red-500/10 hover:bg-red-500/20`
    }


    return (
        <div className='grid grid-cols-4 gap-2 p-2 overflow-y-scroll'>
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

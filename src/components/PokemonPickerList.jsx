import { useState } from 'react'

import { useGlobalPokemonData } from '../context/globalPokemonList'

import { capitalize } from '../utils/helperFunctions'


const PokemonPickerList = () => {

    // Should pass the list down as prop? 
    // The point of the global context is that we don't need to and can just use the hook here right?
    const { pokemonList, setPokemonList } = useGlobalPokemonData()


    // Not sure how you want to use useReducer here so I'm just storing in a state variable for now and logging it
    const [selectedPokemonId, setSelectedPokemonId] = useState(null)

    const handleSelect = (id) => {
        console.log('selected id: ', id)
        setSelectedPokemonId(id)
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

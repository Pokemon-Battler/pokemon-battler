import { createContext, useContext, useState } from "react"


// Variable for the context
const PokemonAPIList = createContext(null)

// custom hook to allow components to use context
export function useGlobalPokemonData() {
    return useContext(PokemonAPIList)
}


// Component to provide global Pokemon List context to app
export default function PokemonListProvider(props) {
    const [pokemonList, setPokemonList] = useState([])

    return (
        <PokemonAPIList.Provider value={{ pokemonList, setPokemonList }}>
            {props.children}
        </PokemonAPIList.Provider>
    )
}

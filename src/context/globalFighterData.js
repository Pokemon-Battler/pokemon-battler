import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { useLocalStorage } from "react-use"



export const PokemonFighters = createContext(null)


export function useGlobalPokemonData() {
    return useContext(PokemonFighters)
}


// Component to provide global context to app
export default function PokemonProvider(props) {
    // Initialise reducer state and dispatcher 
    // const [globalNotesData, globalNotesDispatcher] = useReducer(pokemonReducer, initialData)

    const [fighterData, setFightData] = useState([])


    return (
        <PokemonFighters.Provider value={{ fighterData, setFightData }}>
            {props.children}
        </PokemonFighters.Provider>
    )
}

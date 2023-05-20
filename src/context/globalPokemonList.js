import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { useLocalStorage } from "react-use"




// const initialData = [
//     {
//         id: 1,
//         name: "Pikachu",
//     }
// ]


// function pokemonReducer(state, action) {
//     let stateEditable = [...state]

//     switch (action.type) {
//         case 'setup':
//             stateEditable = action.payload
//             return stateEditable

//         default:
//             return state
//     }
// }




export const PokemonAPIList = createContext(null)


export function useGlobalPokemonData() {
    return useContext(PokemonAPIList)
}


// Component to provide global context to app
export default function PokemonProvider(props) {
    const [pokemonList, setPokemonList] = useState([])

    return (
        <PokemonAPIList.Provider value={{ pokemonList, setPokemonList }}>
            {props.children}
        </PokemonAPIList.Provider>
    )
}

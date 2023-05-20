import { createContext, useContext, useReducer } from "react"

// Initial fighter data to load into reducer
const initialFighterData = {
    fighter1: {
        pokemonId: 1
    },
    fighter2: {
        pokemonId: 3
    }
}

// Fighter reducer
const pokemonReducer = (prevState, action) => {
    switch (action.type) {
        case 'setup':
            console.log('Setup fighter')
            return prevState

        case 'update':
            console.log('Updating fighter')
            return prevState

        default:
            return prevState
    }
}

// Variable to hold Fighter context
const PokemonFighters = createContext(null)

// Custom hook to use the global Fighter context
export function useGlobalFighterData() {
    return useContext(PokemonFighters)
}


// Component to provide global context to app
export default function FighterDataProvider(props) {
    // Initialise reducer state and dispatcher
    const [fighterData, fighterDispatch] = useReducer(pokemonReducer, initialFighterData)

    return (
        <PokemonFighters.Provider value={{ fighterData, fighterDispatch }}>
            {props.children}
        </PokemonFighters.Provider>
    )
}

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
    let stateEditable = { ...prevState }

    switch (action.type) {
        case 'setup':
            return action.payload

        case 'update':
            if (action.payload.player === 'fighter1') {
                stateEditable = { ...stateEditable, fighter1: action.payload.reciever }
            } else {
                stateEditable = { ...stateEditable, fighter2: action.payload.reciever }
            }
            return stateEditable

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

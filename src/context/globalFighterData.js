import { createContext, useContext, useReducer } from "react"

// Initial fighter data to load into reducer
const initialFighterData = {
    fighter1: {
        id: 1,
        name: "bulbasaur",
        abilities: [
            "overgrow",
            "chlorophyll"
        ],
        base_experience: 64,
        height: 7,
        weight: 69,
        moves: [
            {
                name: "false-swipe",
                power: 40,
                type: "normal"
            },
            {
                name: "secret-power",
                power: 70,
                type: "normal"
            },
            {
                name: "hidden-power",
                power: 60,
                type: "normal"
            },
            {
                name: "vine-whip",
                power: 45,
                type: "grass"
            }
        ],
        types: [
            "grass",
            "poison"
        ],
        stats: {
            hp: 45,
            attack: 49,
            defense: 49,
            "special-attack": 65,
            "special-defense": 65,
            speed: 45,
            battleHP: 45
        },
        sprites: {
            front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
        }
    },
    fighter2: {
        id: 21,
        name: "spearow",
        abilities: [
            "keen-eye",
            "sniper"
        ],
        base_experience: 52,
        height: 3,
        weight: 20,
        moves: [
            {
                name: "aerial-ace",
                power: 60,
                type: "flying"
            },
            {
                name: "twister",
                power: 40,
                type: "dragon"
            },
            {
                name: "fury-attack",
                power: 15,
                type: "normal"
            },
            {
                name: "razor-wind",
                power: 80,
                type: "normal"
            }
        ],
        types: [
            "normal",
            "flying"
        ],
        stats: {
            battleHP: 40,
            hp: 40,
            attack: 60,
            defense: 30,
            "special-attack": 31,
            "special-defense": 31,
            speed: 70
        },
        sprites: {
            front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/21.png"
        }
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

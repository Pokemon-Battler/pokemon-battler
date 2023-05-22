import { createContext, useContext, useReducer } from "react"

// Initial fighter data to load into reducer
const initialPlayerData = {
    player1: {
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
                name: "take-down",
                power: 90,
                type: "normal"
            },
            {
                name: "razor-leaf",
                power: 55,
                type: "grass"
            },
            {
                name: "mud-slap",
                power: 20,
                type: "ground"
            },
            {
                name: "secret-power",
                power: 70,
                type: "normal"
            }
        ],
        types: [
            "grass",
            "poison"
        ],
        stats: {
            "battleHP": 45,
            "hp": 45,
            "attack": 49,
            "defense": 49,
            "special-attack": 65,
            "special-defense": 65,
            "speed": 45
        },
        sprites: {
            "front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "back": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            "highRes": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        }
    },
    player2: {
        id: 11,
        name: "metapod",
        abilities: ["shed-skin"],
        base_experience: 72,
        height: 7,
        weight: 99,
        moves: [
            {
                name: "bug-bite",
                power: 60,
                type: "bug"
            },
            {
                name: "electroweb",
                power: 55,
                type: "electric"
            }
        ],
        types: ["bug"],
        stats: {
            battleHP: 50,
            hp: 50,
            attack: 20,
            defense: 55,
            "special-attack": 25,
            "special-defense": 25,
            speed: 30
        },
        sprites: {
            front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/11.png",
            highRes: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png"
        }
    }
}



// Fighter reducer
const pokemonReducer = (prevState, action) => {
    let stateEditable = { ...prevState }

    switch (action.type) {
        case 'setup':
            console.log(action.payload)
            return action.payload

        case 'update':
            if (action.player === 1) {
                stateEditable = { ...stateEditable, player1: action.payload }
            } else {
                stateEditable = { ...stateEditable, player2: action.payload }
            }
            return stateEditable

        default:
            return prevState
    }
}

// Variable to hold Fighter context
const PokemonPlayers = createContext(null)

// Custom hook to use the global Fighter context
export function useGlobalPlayerData() {
    return useContext(PokemonPlayers)
}


// Component to provide global context to app
export default function PlayerDataProvider(props) {
    // Initialise reducer state and dispatcher
    const [playerData, playerDispatch] = useReducer(pokemonReducer, initialPlayerData)

    return (
        <PokemonPlayers.Provider value={{ playerData, playerDispatch }}>
            {props.children}
        </PokemonPlayers.Provider>
    )
}

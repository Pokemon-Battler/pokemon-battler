import { createContext, useContext, useReducer } from "react"

// Initial fighter data to load into reducer
const initialPlayerData = {
    player1: {
        id: 59,
        name: "arcanine",
        abilities: [
            "intimidate",
            "flash-fire",
            "justified"
        ],
        base_experience: 194,
        height: 19,
        weight: 1550,
        moves: [
            {
                name: "rage",
                power: 20,
                type: "normal"
            },
            {
                name: "rock-smash",
                power: 40,
                type: "fighting"
            },
            {
                name: "take-down",
                power: 90,
                type: "normal"
            },
            {
                name: "extreme-speed",
                power: 80,
                type: "normal"
            }
        ],
        types: [
            "fire"
        ],
        stats: {
            battleHP: 90,
            hp: 90,
            attack: 110,
            defense: 80,
            "special-attack": 100,
            "special-defense": 80,
            speed: 95
        },
        sprites: {
            front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/59.png",
            highRes: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png"
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
                console.log(action.payload)
                let tempPlayer1 = stateEditable.player1
                console.log(tempPlayer1.stats.battleHP)
                tempPlayer1.stats.battleHP -= action.payload
                console.log(tempPlayer1.stats.battleHP)
                stateEditable = { ...stateEditable, player1: tempPlayer1 }
            } else {
                let tempPlayer2 = stateEditable.player2
                tempPlayer2.stats.battleHP -= action.payload

                stateEditable = { ...stateEditable, player2: tempPlayer2 }
            }
            return stateEditable

        case 'set':
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

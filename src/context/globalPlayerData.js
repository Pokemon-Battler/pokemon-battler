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
                name: "seed-bomb",
                power: 80,
                type: "grass"
            },
            {
                name: "clear-smog",
                power: 50,
                type: "poison"
            },
            {
                name: "needle-arm",
                power: 60,
                type: "grass"
            },
            {
                name: "poison-fang",
                power: 50,
                type: "poison"
            }
        ],
        types: [
            "grass",
            "poison"
        ],
        stats: {
            battleHP: 45,
            hp: 45,
            attack: 49,
            defense: 49,
            "special-attack": 65,
            "special-defense": 65,
            speed: 45
        },
        sprites: {
            front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            highRes: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            aniFront: `https://play.pokemonshowdown.com/sprites/xyani/bulbasaur.gif`, aniBack: `https://play.pokemonshowdown.com/sprites/ani-back/bulbasaur.gif`
        }
    },
    player2: {
        id: 4,
        name: "charmander",
        abilities: [
            "blaze",
            "solar-power"
        ],
        base_experience: 62,
        height: 6,
        weight: 85,
        moves: [
            {
                name: "magma-storm",
                power: 100,
                type: "fire"
            },
            {
                name: "fire-punch",
                power: 75,
                type: "fire"
            },
            {
                name: "sizzly-slide",
                power: 60,
                type: "fire"
            },
            {
                name: "dragon-darts",
                power: 50,
                type: "dragon"
            }
        ],
        types: [
            "fire"
        ],
        stats: {
            battleHP: 39,
            hp: 39,
            attack: 52,
            defense: 43,
            "special-attack": 60,
            "special-defense": 50,
            speed: 65
        },
        sprites: {
            front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
            highRes: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
            aniFront: `https://play.pokemonshowdown.com/sprites/xyani/charmander.gif`, aniBack: `https://play.pokemonshowdown.com/sprites/ani-back/charmander.gif`
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
            if (action.player === 1) {
                // Deduct damage amount from battle HP
                stateEditable.player1.stats.battleHP -= action.payload

                // Prevent battle HP going below 0
                if (stateEditable.player1.stats.battleHP < 0) {
                    stateEditable.player1.stats.battleHP = 0
                }

                // Save new state
                stateEditable = { ...stateEditable, player1: stateEditable.player1 }
            } else {
                // Deduct damage amount from battle HP
                stateEditable.player2.stats.battleHP -= action.payload

                // Prevent battle HP going below 0
                if (stateEditable.player2.stats.battleHP < 0) {
                    stateEditable.player2.stats.battleHP = 0
                }

                // Save new state
                stateEditable = { ...stateEditable, player2: stateEditable.player2 }
            }
            // Return updated state
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
    const [playerData, playerDispatch] = useReducer(pokemonReducer, initialPlayerData)  // replace initialPlayerData with {} for final deploy

    return (
        <PokemonPlayers.Provider value={{ playerData, playerDispatch }}>
            {props.children}
        </PokemonPlayers.Provider>
    )
}

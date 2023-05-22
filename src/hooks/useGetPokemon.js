import { useState } from 'react'
import { useGlobalPokemonData } from '../context/globalPokemonList'
import { approvedMoves } from '../utils/approvedMoves'
import { useStorage } from './useStorage'
import { moveDataJSON } from '../utils/moveData'

// Function to create an array of random moves with an 80% probability the moves will be the same type as the one supplied
function getRandomMoves(moveData, count, targetMoveType) {
    // Extract values from moveData object
    const moves = Object.values(moveData);

    // Split moves into two groups: matching type and non-matching type
    const matchingMoves = moves.filter(move => move.type === targetMoveType);
    const nonMatchingMoves = moves.filter(move => move.type !== targetMoveType);

    // Calculate the desired count for matching moves and non-matching moves
    const matchingCount = Math.floor(count * 0.9);
    const nonMatchingCount = count - matchingCount;

    // Shuffle the matching moves array
    shuffleArray(matchingMoves);

    // Take the desired count of matching moves and non-matching moves
    const selectedMatchingMoves = matchingMoves.slice(0, matchingCount);
    const selectedNonMatchingMoves = getRandomElements(nonMatchingMoves, nonMatchingCount);

    // Combine the selected matching moves and non-matching moves
    const selectedMoves = [...selectedMatchingMoves, ...selectedNonMatchingMoves];

    return selectedMoves;
}

// Helper function to shuffle an array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper function to get random elements from an array
function getRandomElements(array, count) {
    const shuffledArray = [...array];
    shuffleArray(shuffledArray);
    return shuffledArray.slice(0, count);
}


// This hook makes the main API call to get all the Pokemon data
export function useGetPokemon() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { setPokemonList } = useGlobalPokemonData()
    const { persistenPokemonList, setPersistenPokemonList } = useStorage()

    // Function to clean up pokemon data and get the moves, moves data, and other stats into one place
    async function getPokemonDetails(pokemonData) {
        let result = {
            id: pokemonData.id,
            name: pokemonData.name,
            abilities: [],
            base_experience: pokemonData.base_experience,
            height: pokemonData.height,
            weight: pokemonData.weight,
            moves: [],
            types: [],
            stats: { battleHP: pokemonData.stats[0].base_stat },
            sprites: { front: pokemonData.sprites.front_default, back: pokemonData.sprites.back_default, highRes: pokemonData.sprites.other["official-artwork"].front_default }
        }

        for (let abilityElement of pokemonData.abilities) {
            result.abilities.push(abilityElement.ability.name)
        }

        for (let typeElement of pokemonData.types) {
            result.types.push(typeElement.type.name)
        }

        for (let statsElement of pokemonData.stats) {
            result.stats[statsElement.stat.name] = statsElement.base_stat
        }

        const filteredMoveDataJSON = {};


        pokemonData.moves.forEach(moveElement => {
            // console.log(moveElement)
            if (moveDataJSON.hasOwnProperty(moveElement.move.name)) {
                filteredMoveDataJSON[moveElement.move.name] = moveDataJSON[moveElement.move.name];
            }
        })

        if (result.types.length > 1) {
            let tempMoves = result.types.map(move => getRandomMoves(filteredMoveDataJSON, 8, move))
            result.moves = getRandomElements(tempMoves.flat(), 4)
        } else {
            let tempMoves = getRandomMoves(moveDataJSON, 4, result.types[0])
            result.moves = tempMoves
        }

        return result
    }

    // Main function to get all the pokemon data - the length of the pokemonIds determins how many pokemon to load
    const getPokemon = async () => {
        // Wrap async in try/catch
        try {
            // Data is being loaded from API
            setIsLoading(true)

            // Create an array of id's we want to search for (this will be the number of pokemon we get)
            const pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1)

            // Map a fetch request to each id in the pokemonIds array, save the promises in pokemonPromises
            const pokemonPromises = pokemonIds.map(async (id) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

                // If response is not ok throw an error
                if (!response.ok) {
                    throw new Error(`Unable to get pokemon ${id}`)
                }

                // convert response to json
                return response.json()
            })

            // Use Promise.all to make all the requests concurrently and await them all being being fulfilled
            const pokemonData = await Promise.all(pokemonPromises)

            // Map a fetch request to each pokemon data, save promises in an array
            const cleanedPokemonDataPromises = pokemonData.map(pokemon => getPokemonDetails(pokemon))

            // User Promise.all to make all the fetch requests concurrently
            const cleanedPokemonData = await Promise.all(cleanedPokemonDataPromises)

            // sort the pokemon data (promises might complete at different times so will be out of order)
            const sortedPokemon = cleanedPokemonData.sort((a, b) => a.id - b.id)

            // update global pokemon list context with the pokemon array
            setPokemonList(sortedPokemon)

            // // Save pokemon data to local storage
            // setPersistenPokemonList(sortedPokemon)

        } catch (error) {
            // Add the error to the error state
            setError(error.message)

        } finally {
            // Set loading to false - the data is now loaded
            setIsLoading(false)
        }

    }

    // return the main function, isLoading to show if the data has finished downloading, and the error message
    return { getPokemon, isLoading, error }
}
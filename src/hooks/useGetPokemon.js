import { useState } from 'react'
import { useGlobalPokemonData } from '../context/globalPokemonList'
import { approvedMoves } from '../utils/approvedMoves'



// This hook makes the main API call to get all the Pokemon data
export function useGetPokemon() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { setPokemonList } = useGlobalPokemonData()
    const [cache, setCache] = useState({})

    // Function to clean up pokemon data and get the moves, moves data, and other stats into one place
    async function getPokemonDetails(pokemomData) {
        let result = {
            id: pokemomData.id,
            name: pokemomData.name,
            abilities: [],
            base_experience: pokemomData.base_experience,
            height: pokemomData.height,
            weight: pokemomData.weight,
            moves: [],
            types: [],
            stats: { battleHP: pokemomData.stats[0].base_stat },
            sprites: { front: pokemomData.sprites.front_default, back: pokemomData.sprites.back_default, highRes: pokemomData.sprites.other["official-artwork"].front_default }
        }

        const allowedMoves = pokemomData.moves.filter(move => approvedMoves.includes(move.move.name))

        const shuffledMoves = allowedMoves.sort(() => Math.random() - 0.5)
        const selectedMoves = shuffledMoves.slice(0, 4)

        const movePromises = selectedMoves.map(moveElement => {
            return fetchMoveDetails([moveElement.move])
        })

        const moveDetails = await Promise.all(movePromises)

        for (let i = 0; i < selectedMoves.length; i++) {
            const moveDetail = moveDetails[i]

            if (moveDetail) {
                result.moves.push(moveDetail[0])
            }
        }

        for (let abilityElement of pokemomData.abilities) {
            result.abilities.push(abilityElement.ability.name)
        }

        for (let typeElement of pokemomData.types) {
            result.types.push(typeElement.type.name)
        }

        for (let statsElement of pokemomData.stats) {
            result.stats[statsElement.stat.name] = statsElement.base_stat
        }

        return result
    }


    // Function to fetch the moves data for each move, also caches the moves it has seen before
    async function fetchMoveDetails(moveData) {
        try {
            const movePromises = moveData.map(async (move) => {
                if (move.url) {
                    if (!cache[move.name]) {
                        const response = await fetch(move.url)

                        // If response is not ok throw an error
                        if (!response.ok) {
                            throw new Error(`Unable to get move ${move.name}`)
                        }

                        // Convert response to JSON
                        const moveDetail = await response.json()

                        // Store move promise in cache
                        setCache({ ...cache, [move.name]: moveDetail })

                        return moveDetail
                    } else {
                        // return the cached promise
                        return cache[move.name]
                    }
                }
            })

            const responses = await Promise.all(movePromises)
            const moveDetails = responses.filter(Boolean).map((response) => ({
                name: response.name,
                power: response.power,
                type: response.type.name,
            }))

            return moveDetails

        } catch (error) {
            console.log(error)
        }
    }

    // main function to get all the pokemon data - the length of the pokemonIds determins how many pokemon to load
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
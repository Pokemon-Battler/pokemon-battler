import { useState } from 'react'
import { useGlobalPokemonData } from '../context/globalPokemonList'

// This hook makes the main API call to get all the Pokemon data
export function useGetPokemon() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { setPokemonList } = useGlobalPokemonData()

    const getPokemon = async () => {
        // Wrap async in try/catch
        try {
            // Data is being loaded from API
            setIsLoading(true)

            // Create an array of id's we want to search for (this will be the number of pokemon we get)
            const pokemonIds = Array.from({ length: 100 }, (_, index) => index + 1)

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

            // sort the pokemon data (promises might complete at different times so will be out of order)
            const sortedPokemon = pokemonData.sort((a, b) => a.id - b.id)

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

    return { getPokemon, isLoading, error }
}
import { useState } from 'react'
import { useGlobalPokemonData } from '../context/globalPokemonList'
import { approvedMoves } from '../utils/approvedMoves'



// This hook makes the main API call to get all the Pokemon data
export function useGetPokemon() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { setPokemonList } = useGlobalPokemonData()
    const [typeEffectiveness, setTypeEffectiveness] = useState(null)

    // Function to clean up pokemon data and get the moves, moves data, and other stats into one place
    async function getPokemonDetails(pokemomData) {
        let result = {
            id: pokemomData.id,
            name: pokemomData.name,
            abilities: [],
            base_experience: pokemomData.base_experience,
            height: pokemomData.height,
            weight: pokemomData.weight,
            forms: [],
            moves: [],
            types: [],
            stats: {},
            sprites: { front: pokemomData.sprites.front_default, back: pokemomData.sprites.back_default }
        };

        const allowedMoves = pokemomData.moves.filter(move => approvedMoves.includes(move.move.name))
        // console.log("allowed: " + allowedMoves.length)
        // console.log("all: " + pokemomData.moves.length)
        const shuffledMoves = allowedMoves.sort(() => Math.random() - 0.5);
        const selectedMoves = shuffledMoves.slice(0, 4);
        // console.log(selectedMoves)

        const movePromises = selectedMoves.map(moveElement => {
            return fetchMoveDetails([moveElement.move])
        });

        const moveDetails = await Promise.all(movePromises);

        for (let i = 0; i < selectedMoves.length; i++) {
            const moveDetail = moveDetails[i];

            if (moveDetail) {
                result.moves.push(moveDetail[0]);
            }
        }

        // console.log(result.id, selectedMoves, result.moves)

        for (let abilityElement of pokemomData.abilities) {
            result.abilities.push(abilityElement.ability.name);
        }

        for (let typeElement of pokemomData.types) {
            result.types.push(typeElement.type.name);
        }

        for (let statsElement of pokemomData.stats) {
            result.stats[statsElement.stat.name] = statsElement.base_stat;
        }

        for (let formsElement of pokemomData.forms) {
            result.forms.push(formsElement.name);
        }

        return result;
    }

    // Function to fetch the moves data for each move
    async function fetchMoveDetails(moveData) {
        try {
            const movePromises = moveData.map(async (move) => {
                if (move.url) {
                    const response = await fetch(move.url);

                    // If response is not ok throw an error
                    if (!response.ok) {
                        throw new Error(`Unable to get move ${move.name}`);
                    }

                    // convert response to json
                    return response.json();
                }
            });

            const responses = await Promise.all(movePromises);
            const moveDetails = [];

            for (let i = 0; i < responses.length; i++) {
                if (responses[i].power) {
                    moveDetails.push({
                        name: responses[i].name,
                        power: responses[i].power,
                        type: responses[i].type.name
                    });
                }
            }

            return moveDetails;
        } catch (error) {
            console.log(error);
        }
    }

    // Function to get all the types effectiveness data
    async function fetchTypeData() {
        const tempTypeData = {}
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            const data = await response.json();

            const fetchPromises = data.results.map(result => fetch(result.url));
            const responses = await Promise.all(fetchPromises);
            const typeDataArray = await Promise.all(responses.map(response => response.json()));

            for (const typeData of typeDataArray) {

                const convertedData = {
                    double_damage_from: typeData.damage_relations.double_damage_from.map(obj => obj.name),
                    double_damage_to: typeData.damage_relations.double_damage_to.map(obj => obj.name),
                    half_damage_from: typeData.damage_relations.half_damage_from.map(obj => obj.name),
                    half_damage_to: typeData.damage_relations.half_damage_to.map(obj => obj.name),
                    no_damage_from: typeData.damage_relations.no_damage_from.map(obj => obj.name),
                    no_damage_to: typeData.damage_relations.no_damage_to.map(obj => obj.name)
                }

                tempTypeData[typeData.name] = convertedData
            }
            setTypeEffectiveness(tempTypeData)
            // console.log(typeEffectiveness)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // main function to get all the pokemon data - the length of the pokemonIds determins how many pokemon to load
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

            // Map a fetch request to each pokemon data, save promises in an array
            const cleanedPokemonDataPromises = pokemonData.map(pokemon => getPokemonDetails(pokemon))

            // User Promise.all to make all the fetch requests concurrently
            const cleanedPokemonData = await Promise.all(cleanedPokemonDataPromises);

            // sort the pokemon data (promises might complete at different times so will be out of order)
            const sortedPokemon = cleanedPokemonData.sort((a, b) => a.id - b.id)
            console.log(sortedPokemon[0])

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

    if (!typeEffectiveness) {
        fetchTypeData()
    }

    // return the main function, isLoading to show if the data has finished downloading, and the error message
    return { getPokemon, isLoading, error }
}
import { useLocalStorage } from "react-use"

// This hook allows for all the storage to be read, set and deleted from one place
export function useStorage() {
    const [persistenPokemonList, setPersistenPokemonList, removePersistenPokemonList] = useLocalStorage('pokemonList', null);
    const [persistenPokemonFighter, setPersistenPokemonFighter, removePersistenPokemonFighter] = useLocalStorage('pokemonFighters', []);

    return { persistenPokemonList, setPersistenPokemonList, removePersistenPokemonList, persistenPokemonFighter, setPersistenPokemonFighter, removePersistenPokemonFighter }
}
import { useGlobalPokemonData } from '../context/globalPokemonList'

const PokemonCard = ({ fighterNum, pokemonId }) => {

	const { pokemonList, setPokemonList } = useGlobalPokemonData()
	
    return <div className="border">
		<h2 className="text-center">Fighter {fighterNum}</h2>
		{pokemonList[pokemonId]}
	</div>
}
export default PokemonCard

export const changeBackground = (type) => {
	let background = ''
	switch (type) {
		case 'normal':
			background = 'bg-gray-200'
			break
		case 'fighting':
			background = 'bg-red-200'
			break
		case 'flying':
			background = 'bg-sky-200'
			break
		case 'poison':
			background = 'bg-purple-200'
			break
		case 'ground':
			background = 'bg-amber-200'
			break
		case 'rock':
			background = 'bg-orange-200'
			break
		case 'bug':
			background = 'bg-emerald-200'
			break
		case 'ghost':
			background = 'bg-indigo-200'
			break
		case 'steel':
			background = 'bg-slate-200'
			break
		case 'fire':
			background = 'bg-red-200'
			break
		case 'water':
			background = 'bg-blue-200'
			break
		case 'grass':
			background = 'bg-green-200'
			break
		case 'electric':
			background = 'bg-yellow-200'
			break
		case 'psychic':
			background = 'bg-pink-200'
			break
		case 'ice':
			background = 'bg-cyan-200'
			break
		case 'dragon':
			background = 'bg-violet-200'
			break
		case 'dark':
			background = 'bg-gray-400'
			break
		case 'fairy':
			background = 'bg-pink-200'
			break
		case 'unknown':
			background = 'bg-zinc-200'
			break
		case 'shadow':
			background = 'bg-slate-200'
			break
		default:
			break
	}
	// console.log(background)
	return background
}
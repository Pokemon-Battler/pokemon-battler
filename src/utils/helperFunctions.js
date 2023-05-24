// utility function to capitalize a string
export const capitalize = (str) => {
	return str[0].toUpperCase() + str.slice(1);	
}

export const pickRandom = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)]
}
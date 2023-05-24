// const images = []

// function importAll(r) {
//   r.keys().forEach((key) => images.push(r(key).default))
// }

// importAll(require.context('.', false, /\.(png|jpe?g|svg)$/))

// export default images

import image1 from './1.png'
import image2 from './2.png'
import image3 from './3.png'

export default [
	image1,
	image2,
	image3
]

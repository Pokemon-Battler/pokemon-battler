import { useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'

const RotateTest = () => {
    const { playerData, playerDispatch } = useGlobalPlayerData()
    const { player1, player2 } = playerData

    const [boolVal, setBoolVal] = useState(false)

    return (
        <div>
            <button onClick={() => setBoolVal(!boolVal)} className='border border-black p-4 mx-auto'>
                Toggle
            </button>

            <div className={`card h-[30vh] ${boolVal && 'flip-move-down'} border-0 border-green-500`}>
                <div className='front grid grid-cols-2'>
                    <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quaerat quia illum, nesciunt, vel quasi eveniet
                        nam cupiditate enim, modi aut velit totam non adipisci
                        in unde! Adipisci velit cumque sit dolor, facilis totam,
                        repellat maiores ipsum alias magni itaque voluptatibus
                        modi? Laudantium quibusdam voluptatibus fuga
                        necessitatibus excepturi dolore numquam optio.
                    </div>
                    <div>
                        <img
                            src={player1.sprites.front}
                            alt=''
                            className='h-full mx-auto'
                        />
                    </div>
                </div>
                <div className='back'>
                    <div className='front grid grid-cols-2'>
                        <div>
                            <img
                                src={player1.sprites.back}
                                alt=''
                                className='h-full mx-auto'
                            />
                        </div>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Quaerat quia illum, nesciunt, vel quasi
                            eveniet nam cupiditate enim, modi aut velit totam
                            non adipisci in unde! Adipisci velit cumque sit
                            dolor, facilis totam, repellat maiores ipsum alias
                            magni itaque voluptatibus modi? Laudantium quibusdam
                            voluptatibus fuga necessitatibus excepturi dolore
                            numquam optio.
                        </div>
                    </div>
                </div>
            </div>



            <div className={`card h-[30vh] ${boolVal && 'flip-move-up '} border-0 border-pink-500`}>
                <div className='front grid grid-cols-2'>
                    <div>
                        <img
                            src={player2.sprites.back}
                            alt=''
                            className='h-full mx-auto'
                        />
                    </div>
                    <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quaerat quia illum, nesciunt, vel quasi eveniet
                        nam cupiditate enim, modi aut velit totam non adipisci
                        in unde! Adipisci velit cumque sit dolor, facilis totam,
                        repellat maiores ipsum alias magni itaque voluptatibus
                        modi? Laudantium quibusdam voluptatibus fuga
                        necessitatibus excepturi dolore numquam optio.
                    </div>
                </div>
                <div className={`back ${boolVal && ''}`}>
                    <div className='front grid grid-cols-2'>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Quaerat quia illum, nesciunt, vel quasi
                            eveniet nam cupiditate enim, modi aut velit totam
                            non adipisci in unde! Adipisci velit cumque sit
                            dolor, facilis totam, repellat maiores ipsum alias
                            magni itaque voluptatibus modi? Laudantium quibusdam
                            voluptatibus fuga necessitatibus excepturi dolore
                            numquam optio.
                        </div>
                        <div>
                            <img
                                src={player2.sprites.front}
                                alt=''
                                className='h-full mx-auto'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RotateTest

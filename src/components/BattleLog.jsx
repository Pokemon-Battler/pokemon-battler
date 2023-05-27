import { useState } from 'react'
import { HiChevronLeft, HiXMark } from 'react-icons/hi2'

const BattleLog = ({ battleLog }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div>
            {battleLog.length !== 0 && (
                <div
                    className={`absolute px-2 py-1 ${battleLog.length > 1 && 'rounded-tl'} bottom-0 right-0 bg-gray-800 text-white opacity-50 font-mono text-sm min-w-[50%] ${
                        !isOpen && 'translate-x-full'
                    } duration-500`}
                >
                    {/* <div className='bg-gradient-to-t from-white to-white/20 text-clip bg-clip-text text-transparent'> */}
                    <div>
                        {battleLog.map((data, index) => (
                            <p key={index} className=''>
                                [<span>{data.attackTime}</span>]{' '}
                                <span className='font-bold underline'>
                                    {data.attackerName}
                                </span>{' '}
                                (Attack: {data.attackScore}) attacked{' '}
                                <span className='font-bold underline'>
                                    {data.receiverName}
                                </span>{' '}
                                (Defence: {data.defenceScore}) using{' '}
                                <span className='font-bold underline'>
                                    {data.moveName}
                                </span>{' '}
                                for a total damage of {data.totalDamage}
                            </p>
                        ))}
                    </div>
                    <button
                        className='absolute -translate-x-[128%] bottom-0 bg-gray-800 rounded-tl'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {battleLog.length > 0 && isOpen ? (
                            <div>
                                <HiXMark className='w-7 h-7'/>
                            </div>
                        ) : (
                            // <span>Close X</span>
                            <HiChevronLeft className='w-7 h-7'/>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
export default BattleLog

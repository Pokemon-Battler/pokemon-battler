const BattleLog = ({ battleLog }) => {
    return (
        <>
            {battleLog.length !== 0 && (
                <div className='absolute px-2 py-1 rounded bottom-0 right-0 bg-gray-800 text-white opacity-50 font-mono text-sm min-w-[50%]'>
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
                </div>
            )}
        </>
    )
}
export default BattleLog

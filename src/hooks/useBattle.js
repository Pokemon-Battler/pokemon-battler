import { useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { typeEffectiveness } from '../utils/typeEffectiveness'
import { capitalize } from '../utils/helperFunctions';

function findMatchingKey(type1, type2) {
    for (const key1 in typeEffectiveness) {
        if (key1 === type1) {
            for (const key2 in typeEffectiveness[key1]) {
                if (typeEffectiveness[key1][key2].includes(type2)) {
                    return key2
                }
            }
        }
    }

    return null; // No matching key found
}


function capitalizeMove(moveName) {
    return moveName.split('-').map(word => capitalize(word)).join('-')
}

// This hook is for making attacks and updating the player stats to reflect the damage
export function usePokemonBattle() {
    const [isWinner, setIsWinner] = useState(null)
    const [attackResponse, setAttackResponse] = useState("")
    const { playerDispatch } = useGlobalPlayerData()

    const [attackData, setAttackData] = useState({})
    
    // function to crunch the all the data and generate a single attack damage number
    const calculateDamage = (move, attacker, receiver) => {

        // power of the move
        const power = move.power
        // setAttackData(prevData => ({ ...prevData , movePower: power }))

        // attacker's attack score
        const attack_effective = attacker.stats.attack

        // defender's defence score
        const defence_effective = receiver.stats.defense
        // addAttackDataProperty('defenceScore', defence_effective)

        // random chance of a critical hit
        const critical = Math.random() < (Math.floor(Math.random() * 256) / 256) ? 2 : 1

        // effectiveness multiplyer of the attack (against different types)
        let effect = 1

        // Standard response
        let response = "Attack hit!"

        // Get the kind of effect the move type has on the defender type
        let typeEffect = findMatchingKey(move.type, receiver.types[0])

        // Switch to get the natural language interpretation of the effect
        switch (typeEffect) {
            case "double_damage_to":
                response = "It was super effective!"
                effect = 2
                break
            case "half_damage_to":
                response = "It was not very effective!"
                effect = 1.5
                break
            case "no_damage_to":
                response = "It had no effect!"
                effect = 0
                break
            default:
                break;
        }

        // Calculate the overall effectiveness of the move
        const effectiveness = (attacker.types.includes(move.type) ? 1.5 : 1) * effect
        // addAttackDataProperty('effectiveness', effectiveness)

        // randomiser to make the score slightly different each time
        const randomness = ((Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255)

        // official damage score algorithm
        const totalDamage = Math.floor(((((((2 * critical) / 5) + 2) * power * (attack_effective / defence_effective)) / 50) + 2) * effectiveness * randomness)

        console.log(capitalizeMove(move.name))

        setAttackData({
            attackerName: capitalize(attacker.name),
            receiverName: capitalize(receiver.name),
            moveName: capitalizeMove(move.name),
            movePower: power,
            attackScore: attack_effective, 
            defenceScore: defence_effective, 
            effectiveness, 
            totalDamage,
            attackTime: new Date().toLocaleTimeString().replace(/ (AM|PM|am|pm)/, '')
        })

        // return the message to show in the UI, damage, and attackData for the battlelog
        return { response: response, damage: totalDamage, attackData }
    }

    // main function to make an attack, include the attack move object, the attacker and reciever pokemon objects, and the player string (eg: "player1")
    const attack = (move, attacker, receiver, player) => {
        // console.log(`Player ${player} with ${attacker.name} used ${move.name}!`)

        // Random chance to miss completely
        if (Math.random() < 0.95) {
            const moveResult = calculateDamage(move, attacker, receiver)

            // console.log(moveResult.damage)

            // update the health of the reciever
            playerDispatch({ type: 'update', player: player, payload: moveResult.damage })

            if (moveResult.damage > receiver.stats.battleHP) {
                setAttackResponse('GAME OVER: ' + capitalize(receiver.name) + ' fainted!')
            } else {
                setAttackResponse(moveResult.response)
            }

            return { damage: moveResult.damage, remainingHP: receiver.stats.battleHP, attackData: moveResult.attackData }

        } else {
            // Attack has missed!
            setAttackResponse("Attack missed!")
            return { damage: 0, remainingHP: receiver.stats.battleHP }
        }


    }

    // Check if there is a winner and set the AttackResponse and isWinner values


    return { attack, setIsWinner, isWinner, attackResponse, setAttackResponse, attackData }
}

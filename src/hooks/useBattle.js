import { useState } from 'react'
import { useGlobalPlayerData } from '../context/globalPlayerData'
import { typeEffectiveness } from '../utils/typeEffectiveness'

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


// This hook is for making attacks and updating the player stats to reflect the damage
export function usePokemonBattle() {
    const [isWinner, setIsWinner] = useState(null)
    const [attackResponse, setAttackResponse] = useState("")
    const { playerData, playerDispatch } = useGlobalPlayerData()

    // function to crunch the all the data and generate a single attack damage number
    const calculateDamage = (move, attacker, receiver) => {

        // power of the move
        const power = move.power

        // attacker's attack score
        const attack_effective = attacker.stats.attack

        // defender's defence score
        const defence_effective = receiver.stats.defense

        // random chance of a critical hit
        const critical = Math.random() < (Math.floor(Math.random() * 256) / 256) ? 2 : 1

        // effectiveness multiplyer of the attack (against different types)
        let effect = 1

        // Standard response
        let response = "It was effective!"

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

        // randomiser to make the score slightly different each time
        const randomness = ((Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255)

        // official damage score algorithm
        return { response: response, damage: Math.floor(((((((2 * critical) / 5) + 2) * power * (attack_effective / defence_effective)) / 50) + 2) * effectiveness * randomness) }
    }

    // main function to make an attack, include the attack move object, the attacker and reciever pokemon objects, and the player string (eg: "player1")

    // move: object
    // attack: player object from context
    // receiver: player object from context
    // player: number
    const attack = (move, attacker, receiver, player) => {
        // console.log(`Player ${player} with ${attacker.name} used ${move.name}!`)

        // Random chance to miss completely
        if (Math.random() < 0.95) {
            const moveResult = calculateDamage(move, attacker, receiver)

            // console.log(moveResult.damage)

            // update the health of the reciever
            playerDispatch({ type: 'update', player: player, payload: moveResult.damage })

            setAttackResponse(moveResult.response)
            // console.log(moveResult.response)

            // check if there is a winner after the attack
            checkWinner()

        } else {
            // Attack has missed!
            setAttackResponse("Attack missed!")

            // Confirm no winner has been found
            checkWinner()
        }
    }

    // Check if there is a winner and set the AttackResponse and isWinner values
    const checkWinner = () => {
        const { player1, player2 } = playerData

        if (player1.stats.hp <= 0) {
            setIsWinner(player1)
            setAttackResponse('GAME OVER: ' + player1.name + ' fainted!')
        } else if (player2.hp <= 0) {
            setIsWinner(player2)
            setAttackResponse('GAME OVER: ' + player2.name + ' fainted!')
        } else {
            setIsWinner(false)
        }
    }


    return { attack, checkWinner, isWinner, attackResponse }
}

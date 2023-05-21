import { useState } from 'react'
import { useGlobalFighterData } from '../context/globalFighterData'
import { typeEffectiveness } from '../utils/typeEffectiveness'
// import { approvedMoves } from '../utils/approvedMoves'


// This hook is for making attacks and updating the fighter stats to reflect the damage
export function usePokemonBattle() {
    const [isWinner, setIsWinner] = useState(null)
    const [attackResponse, setAttackResponse] = useState("")
    const { fighterData, fighterDispatch } = useGlobalFighterData()

    // function to crunch the all the data and generate a single attack damage number
    const calculateDamage = (move, attacker, receiver) => {
        // power of the move
        const power = attacker.moves["move-name"].power

        // attacker's attack score
        const attack_effective = attacker.stats.attack

        // defender's defence score
        const defence_effective = receiver.stats.defence

        // random chance of a critical hit
        const critical = Math.random() < (Math.floor(Math.random() * 256) / 256) ? 2 : 1

        // effectiveness of the attack (against different types)
        let effect = 1
        for (let effect of typeEffectiveness[move.type]) {
            if (effect.includes(move.type)) {
                switch (String(effect)) {
                    case "double_damage_to":
                        setAttackResponse("It was super effective!")
                        effect = 2
                        break
                    case "half_damage_to":
                        setAttackResponse("It was not very effective!")
                        effect = 1.5
                        break
                    case "no_damage_to":
                        setAttackResponse("It had no effect!")
                        effect = 0
                        break
                    default:
                        break;
                }
            }
        }
        const effectiveness = (attacker.types.includes(move.type) ? 1.5 : 1) * effect

        // randomiser to make the score slightly different each time
        const randomness = ((Math.floor(Math.random() * (255 - 217 + 1)) + 217) / 255)

        // official damage score algorithm
        return Math.floor(((((((2 * critical) / 5) + 2) * power * (attack_effective / defence_effective)) / 50) + 2) * effectiveness * randomness)
    }

    // main function to make an attack, include the attack move object, the attacker and reciever pokemon objects, and the player string (eg: "Fighter1")
    const attack = (move, attacker, receiver, player) => {
        console.log(attacker.name + ' used ' + move.name + '!')

        // Random chance to miss completely
        if (Math.random() < 0.95) {
            // Calculate damage and apply to reciever's battle HP
            receiver.stats.battleHP -= calculateDamage(move, attacker, receiver)

            // update the health of the reciever
            fighterDispatch({ type: 'update', payload: { player, receiver } })

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
        const { fighter1, fighter2 } = fighterData

        if (fighter1.stats.hp <= 0) {
            setIsWinner(fighter1)
            setAttackResponse('GAME OVER: ' + fighter1.name + ' fainted!')
        } else if (fighter2.hp <= 0) {
            setIsWinner(fighter2)
            setAttackResponse('GAME OVER: ' + fighter2.name + ' fainted!')
        } else {
            setIsWinner(false)
        }
    }


    return { attack, checkWinner, isWinner, attackResponse }
}

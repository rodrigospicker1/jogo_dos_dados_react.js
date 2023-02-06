import Die from "./Die"
import React from "react"

export default function App(){

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue) {
            if (allHeld && allSameValue){
                setTenzies(true)
                console.log('you won!')
            }
        }
    }, [dice])

    function generateNewDie(){
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        }
    }

    function allNewDice(){

        const newDice = []
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDie())
        }
        return newDice

    }

    function rollDice(){
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
            die :
            generateNewDie()
        }))
    } 

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
        }))
    }

    const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

    return(
        <main>
            <h1 className="title">Jogo dos dados</h1>
            <p className="instructions">Role os dados até eles forem o mesmo. Clique em cada dado para para-los todos no mesmo valor</p>
             <div className="dice-container" >
                {diceElements}
             </div>
             <button className="roll-dice" onClick={rollDice}>Role os dados</button>
        </main>
    )
}
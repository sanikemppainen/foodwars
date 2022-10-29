import { useState } from "react"
import Notification from "./Notification"

const PlayView=({player1, player2})=>{
    let startTime=0
    let firstToHit=[]
    let secondToHit=[]
    let firstToHitHP=0
    let firstToHitDelay=0
    let firstToHitDefence=0
    let firstToHitDeath=0
    let secondToHitDelay=0
    let secondToHitHP=0
    let secondToHitDefence=0
    let secondToHitDeath=0
    let timeFirst=parseInt(0)
    let timeSecond=parseInt(0)
    let spicynessLevel=0
    let arrayOfBattle=[]
    let clicked=false
    let timeAddFirst=0
    let timeAddSecond=0

    let winner=[]

    const [notification, setNotification]=useState(null)
    

    const battle=()=>{
        arrayOfBattle = []
        startTime=0
        if (player1.delay<player2.delay){
            firstToHit=player1
            firstToHitHP=player1.energy
            firstToHitDelay=player1.delay
            firstToHitDefence=player1.protein/100
            firstToHitDeath=player1.cholesterol
            timeFirst=player1.delay
            timeAddFirst=player1.delay
            secondToHit=player2 
            secondToHitHP=parseInt(player2.energy)
            secondToHitDelay=player2.delay
            secondToHitDefence=player2.protein/100
            secondToHitDeath=player2.cholesterol
            timeSecond=player2.delay
            timeAddSecond=player2.delay
        }else{
            firstToHit=player2
            firstToHitHP=player2.energy
            firstToHitDelay=player2.delay
            firstToHitDefence=player2.protein/100
            firstToHitDeath=player2.cholesterol
            timeFirst=player2.delay
            timeAddFirst=player2.delay
            secondToHit=player1
            secondToHitHP=parseInt(player1.energy)
            secondToHitDelay=player2.delay
            secondToHitDefence=player2.protein/100
            secondToHitDeath=player1.cholesterol
            timeSecond=player1.delay
            timeAddSecond=player1.delay
        }
        console.log('ALKAAAA 0 s taistelu alkaa')
        console.log('1 first hits', timeFirst, firstToHit.name, )

        while(firstToHitHP >=0 && secondToHitHP >=0){
            if(timeFirst<timeSecond){
                
                console.log(timeFirst,"s ", firstToHit.name," hit causing ", firstToHit.carbs, " damage to", secondToHit.name,"which is left with ", secondToHitHP-firstToHit.carbs+(firstToHit.carbs*secondToHitDefence), "ekan suddendeath", firstToHit.cholesterol, "tokan", secondToHit.cholesterol)
                arrayOfBattle.push(timeFirst+"s "+firstToHit.name+" hit causing "+ firstToHit.carbs+ " damage to "+secondToHit.name+" who is left with "+ (secondToHitHP-firstToHit.carbs+(firstToHit.carbs*secondToHitDefence)).toFixed(0) +" HP")
                secondToHitHP=secondToHitHP-firstToHit.carbs+(firstToHit.carbs*secondToHitDefence)

                timeFirst+=timeAddFirst
                console.log('aijat', timeFirst, timeAddFirst)
                firstToHitDeath+=firstToHitDeath
            }else if(timeSecond<=timeFirst){
                console.log(timeSecond,"s ", secondToHit.name,"löi aiheuttaen", secondToHit.carbs, "damagea", firstToHit.name,"lle jolle jää ", firstToHitHP-secondToHit.carbs+(secondToHit.carbs*firstToHitDefence), "ekan suddendeath", secondToHit.cholesterol, "tokan", firstToHit.cholesterol)
                arrayOfBattle.push(timeSecond+"s "+secondToHit.name+" hit causing "+ secondToHit.carbs+ " damage to "+firstToHit.name+" who is left with "+ (firstToHitHP-secondToHit.carbs+(secondToHit.carbs*firstToHitDefence)).toFixed(0)+" HP")
                firstToHitHP=firstToHitHP-secondToHit.carbs+(secondToHit.carbs*firstToHitDefence)

                timeSecond+=timeAddSecond
                secondToHitDeath+=secondToHitDeath
            }
            if (firstToHit.name ==='CHILI' || secondToHit.name==='CHILI'){
                spicynessLevel+=1
                console.log(spicynessLevel)
                if(spicynessLevel>6){
                    showSpicy('too spicy')
                    console.log('too spicy')
                    if(firstToHit.name === 'Chili'){
                        arrayOfBattle.push("And the winner is...." +firstToHit.name+"!")
                    }else if(secondToHit.name==='Chili'){
                        arrayOfBattle.push("And the winner is...." +secondToHit.name+"!")
                    }
                    break
                }
            }
            if(firstToHitDeath>100 || secondToHitDeath>100){
                console.log('liian kolest')
                showSuddenDeath('Death by cholesterol overload')
                if(firstToHitDeath>100){
                    arrayOfBattle.push("OH NO! What happened to "+firstToHit.name+"? Due to poor health, it cannot recover for the next round so the winner is...." +secondToHit.name+"!")
                }else if(secondToHitDeath>100){
                    arrayOfBattle.push("OH NO! What happened to "+secondToHit.name+"? Due to poor health, it cannot recover for the next round so the winner is...." +firstToHit.name+"!")
                }
                break
            }

        }
        if(firstToHitHP<0){
            arrayOfBattle[arrayOfBattle.length -1 ] = timeSecond-(timeAddSecond)+"s "+secondToHit.name+" hit causing "+ secondToHit.carbs+ " damage to "+firstToHit.name+" who is left with 0 HP"
            arrayOfBattle.push("And the winner is...." +secondToHit.name)

        }else if(secondToHitHP<0){
            arrayOfBattle[arrayOfBattle.length -1 ] = timeFirst-(timeAddFirst)+"s "+firstToHit.name+" hit causing "+ firstToHit.carbs+ " damage to "+secondToHit.name+" who is left with 0 HP"
            arrayOfBattle.push("And the winner is...." +firstToHit.name)

        }
    }
    const showSpicy=()=>{ 
        const showspicy=document.getElementById("showspicy")
        showspicy.style.display="block"

    }
    const showSuddenDeath=()=>{ 
        const showdeath=document.getElementById("showdeath")
        showdeath.style.display="block"

    }

    const handleClick=()=>{
        const s = document.getElementById("idd")
        s.style.display = "block"
        const startbutton=document.getElementById("showgame")
        startbutton.style.display="none"
        const resetButton=document.getElementById("resetButton")
        resetButton.style.display="block"
    }
    
    return(

      <div className="wholething">
        <button id="showgame" onClick={()=>handleClick()} onDragOverCapture={battle()}></button>
        
        <div className="gameDiv">
            <div id="idd">
                <div className="playerIntroduction">
                {player1.name} VS {player2.name}
                <br/>
                {player1.name} starts with {player1.energy} health points and {player2.name} starts with {player2.energy} health points
                <br/>
            </div>
                {arrayOfBattle.map(row=>
                <ul key={row}>
                    <li>{row}</li>
                </ul>)}
                
                    <div id="showspicy">
                        Looks like Chili got a secret weapon up its sleeve.... 
                        <br/>
                        Even though the opponent still has HP left, Chili sweats it out by turning UP the heat!
                        <br/>
                        As the opponent couldn't handle the Scovilles rising, Chili won by capsaicin overload!
                        <br/>
                    </div>
                    <div id="showdeath">
                        Although at first glance the junk food warrior may seem strong and powerful....
                        <br/>
                        We must remember that when great power is fueled by high amounts of fat and energy, a dangerous little creature called cholesterol can also start accumulating...
                        <br/>
                        So the junk food warrior is defeated by its own greatness and dies a sudden death caused by a build up of cholesterol and the opponent ends up winning by default!
                        <br/>
                        ...Maybe next time check the 'Danger Points' of a character to see who is at risk of sudden death!
                    </div>
            </div>

        </div>
          
            
       
      </div>
      
      
    )

}

  export default PlayView


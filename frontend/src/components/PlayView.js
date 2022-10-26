
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
    let time=0
    let timeFirst=0
    let timeSecond=0
    let spicynessLevel=0
    let counter=0

    let winner=[]

    //aika ja spicylevel ja kolesteroli ja hp muuttuu pelin edetessä

    const battle=()=>{
        startTime=0
        if (player1.delay<player2.delay){
            firstToHit=player1
            firstToHitHP=player1.energy
            firstToHitDelay=player1.delay
            firstToHitDefence=player1.protein/100
            firstToHitDeath=player1.cholesterol
            secondToHit=player2 
            secondToHitHP=parseInt(player2.energy)
            secondToHitDelay=player2.delay
            secondToHitDefence=player2.protein/100
            secondToHitDeath=player2.cholesterol
        }else{
            firstToHit=player2
            firstToHitHP=player2.energy
            firstToHitDelay=player2.delay
            firstToHitDefence=player2.protein/100
            firstToHitDeath=player2.cholesterol
            secondToHit=player1
            secondToHitHP=parseInt(player1.energy)
            secondToHitDelay=player2.delay
            secondToHitDefence=player2.protein/100
            secondToHitDeath=player1.cholesterol
        }
        while(firstToHitHP>0 && secondToHitHP>0){
            //vuorottelu
            console.log(timeFirst, timeSecond,startTime,"s ", firstToHit.name,"löi aiheuttaen", firstToHit.carbs, "damagea", secondToHit.name,"lle jolle jää ", secondToHitHP-firstToHit.carbs+(firstToHit.carbs*secondToHitDefence), "ekan suddendeath", firstToHit.cholesterol, "tokan", secondToHit.cholesterol)
            secondToHitHP=secondToHitHP-firstToHit.carbs+(firstToHit.carbs*secondToHitDefence)
            timeFirst=timeFirst+firstToHitDelay
            firstToHitDeath+=firstToHitDeath
            timeSecond=timeSecond+secondToHitDelay         
            secondToHitDeath+=secondToHitDeath
            if (firstToHit.name ==='Chili' || secondToHit.name==='Chili'){
                spicynessLevel+=1
                if(spicynessLevel>15){
                    console.log('too spicy')
                    break
                }
            }
            if(firstToHitDeath>300 || secondToHitDeath>300){
                console.log('liian kolest')
                break
            }
        }
        console.log(time,startTime,"s ", firstToHit.name,"löi aiheuttaen", firstToHit.carbs, "damagea", secondToHit.name,"lle jolle jää ", secondToHitHP-firstToHit.carbs+(firstToHit.carbs*secondToHitDefence), "ekan suddendeath", firstToHit.cholesterol, "tokan", secondToHit.cholesterol)
        
    }

    
    return(
      <div>
        play view:
        <div className="playerIntroduction">
        {player1.name} VS {player2.name}
        <br/>
        {player1.name} starts with {player1.energy} health points and {player2.name} starts with {player2.energy} health points
        <br/>
        <div className="battle">
            {firstToHit.name}
            <div className="battlePhotos">
            </div>
            <div className="battleText">
                <table>
                    <tr>
                        <th>time</th>
                        <th>turn</th>
                        <th>situation</th>
                    </tr>
                    <tr>
                        <td>{startTime}</td>
                        <td>{player1.name}</td>
                    </tr>

                </table>
            </div>
            <button onClick={battle()}></button>

        </div>
        </div>
        <br></br>
      </div>
    )
  }

  export default PlayView
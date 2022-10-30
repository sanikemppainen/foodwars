import React, { useState } from 'react'
import PlayView from './PlayView'


const ChoosePlayer=({ goodCharacters, badCharacters})=>{
    const [player1, setPlayer1]=useState([])
    const [player2, setPlayer2]=useState([])
    

    const player1ToGame=(player1)=>{
        setPlayer1(player1)
    }
    const player2ToGame=(player2)=>{
        setPlayer2(player2)
    }
    const setPlayersToZero=()=>{
      setPlayer1('')
      setPlayer2('')
      const s = document.getElementById("idd")
      s.style.display = "none"
      const showspicy=document.getElementById("showspicy")
      showspicy.style.display="none"
      const showdeath=document.getElementById("showdeath")
      showdeath.style.display="none"
      const startbutton=document.getElementById("showgame")
      startbutton.style.display="block"
      const resetButton=document.getElementById("resetButton")
      resetButton.style.display="none"
    }
  
    return(
      <div className="wholePage">
      <div className="containerChoosePlayer">
        <div className='dropdownMenus'>
          <div className='welcometofwphoto'/>
          <div className='dropdownMenu'>
            <button className='dropdownButton'>choose player 1</button>
            <div className='dropdown-content'>
              {goodCharacters.map(character=> 
                <button key={character.id} href="#" onClick={()=>player1ToGame(character)}> {character.name}  </button>)}
            </div>
          </div>
          <div className='dropdownMenu'>
            <button className='dropdownButton'>choose player 2</button>
            <div className='dropdown-content'>
              {badCharacters.map(character=> 
                <button key={character.id} href="#" onClick={()=>player2ToGame(character)}>{character.name}</button>)}
            </div>
          </div>
          </div>
        </div>
        <div className='playerStats'>
            <div className='player1'>
              Player name: {player1.name}
              <br/>
              Health Points: {player1.energy} 
              <br/>
              Danger points: {player1.cholesterol} 
              <br/>
              Defence: {player1.protein}
              <br/>
              Strength: {player1.carbs}
              <br/>
              Delay: {player1.delay}
            </div>
            <br></br>
            <div className='player2'>
              Player name: {player2.name}
              <br/>
              Health Points: {player2.energy} 
              <br/>
              Danger points: {player2.cholesterol} 
              <br/>
              Defence: {player2.protein}
              <br/>
              Strength: {player2.carbs}
              <br/>
              Delay: {player2.delay}
            </div>
      </div>
      <PlayView player1={player1} player2={player2}/>
      <div className='resetDiv'>
        <button id="resetButton" onClick={setPlayersToZero}></button>
      </div>
    </div>
    )
  }



export default ChoosePlayer


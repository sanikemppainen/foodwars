import './index.css'
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Redirect, Switch, useRouteMatch, useRoutes, useHistory } from 'react-router-dom'
import charactersServise from './services/characters'

const WelcomePage=()=>{
  return(
    <div className="wrapper">
      <div className="welcomephoto"></div>
      <a href='/chooseplayer' className="button">
        <div className="startphoto"></div>
      </a>
    </div>
    )
}
const ChoosePlayer=()=>{
  return(
    <div>
      <div className='welcometofwphoto'/>
      choose player
    </div>
  )
}
const PlayView=()=>{
  return(
    <div>
      play view
    </div>
  )
}
const getAllCharacters=()=>{
}

const Character=()=>{
  const name=''
  const hp=0
  const attack=0
  const defence=0
  const fat=0
  const speed=attack+defence+fat

}

const App= ()=>{
  const [player1, setPlayer1]=useState([])
  const [player2, setPlayer2]=useState([])

  const [goodCharacters, setGoodCharacters]=useState([])
  const [badCharacters, setBadCharacters]=useState([])

  useEffect(()=>{
    charactersServise
      .getAll()
      .then(response=>{
        setGoodCharacters(response.data)
      })
      .catch(error=>{
        console.log('couldnt get characters from api: ', error)
      })

  })
  console.log(goodCharacters)

  return(
    <div>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/chooseplayer" element={<ChoosePlayer/>}/>
      <Route path="/play" element={<PlayView/>}/>
    </Routes>
    </div>
    
  )
}


export default App

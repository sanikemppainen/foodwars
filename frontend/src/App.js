import './index.css'
import React, {useEffect, useState} from 'react'
import { Route, Routes,  } from 'react-router-dom'
import charactersServise from './services/characters'
import WelcomePage from './components/WelcomePage'
import ChoosePlayer from './components/ChoosePlayer'
import PlayView from './components/PlayView'


const App= ()=>{

  const [goodCharacters, setGoodCharacters]=useState([])
  const [badCharacters, setBadCharacters]=useState([])


  useEffect(()=>{
    Promise.all([
      charactersServise
      .getAllGood()
      .then(response=>{
        setGoodCharacters(response.data)
      })
      .catch(error=>{
        console.log('couldnt get characters from api: ', error)
      }),

      charactersServise
      .getAllBad().then(response=>{
        setBadCharacters(response.data)
      })
      .catch(error=>{
        console.log('couldnt get bad characters from api:', error)
      })
    ])

  }, [])
  return(
    <div>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/chooseplayer" element={<ChoosePlayer goodCharacters={goodCharacters} badCharacters={badCharacters} />}/>
      <Route path="/playview" element={<PlayView/>}/>
    </Routes>
    </div>
    
  )
}

export default App

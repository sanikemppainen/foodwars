import './index.css'
import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Redirect, Switch, useRouteMatch, useRoutes, useHistory } from 'react-router-dom'

const WelcomePage=()=>{
  return(
    <div className="wrapper">
      <div className="welcomephoto"></div>
      <div className="startphoto"></div>
    </div>
    )
}
const ChoosePlayer=()=>{
  console.log('kävi')
  return(
    <div>
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

const App= ()=>{
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

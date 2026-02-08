import React from 'react'
import './App.css'
import './components/Header.jsx'
import Header from './components/Header.jsx'
import MainAuth from './pages/auth/MainAuth.jsx'
import Artwork from './pages/artwork/artwork.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Header/>

      <Routes>
        <Route path='/auth/*' element={<MainAuth/>} />
        <Route path='/artwork/*' element={<Artwork/>}/>
      </Routes>

    </Router>
  )
}

export default App

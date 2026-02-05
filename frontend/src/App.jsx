import React from 'react'
import './App.css'
import './components/Header.jsx'
import Header from './components/Header.jsx'
import MainAuth from './pages/auth/MainAuth.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Header/>

      <Routes>
        <Route path='/auth/*' element={<MainAuth/>} />
      </Routes>

    </Router>
  )
}

export default App

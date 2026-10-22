import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Teambekijken from './pages/Teambekijken'
import Home from './pages/Home'
import Teammaken from './pages/Teammaken'
import PokemonToevoegen from './pages/PokemonToevoegen'
import './css/App.css'
import './css/Header.css'
import './css/Home.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Teammaken" element={<Teammaken />} />
          <Route path="/Teambekijken" element={<Teambekijken />} />
          <Route path="/PokemonToevoegen" element={<PokemonToevoegen />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

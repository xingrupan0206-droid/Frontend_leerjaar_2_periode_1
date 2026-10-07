import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Profiel_foto from '../assets/Profiel_foto.jpg'

function Home() {

  return (
    <>
      <Header />
      <div className="body">
        <img className='Profiel_foto' src={Profiel_foto} alt="Pokéball" />
        <div className="homeButtons">
          <Link className='teammaken' to="/Teammaken">Team Aanmaken</Link>
          <Link className="teambekijken" to="/Teambekijken">Gemaakte Team</Link>
        </div>
      </div>
    </>
  )
}

export default Home
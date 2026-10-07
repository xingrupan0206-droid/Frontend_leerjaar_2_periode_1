import Pokeball from '../assets/logo.png'

function Header() {

  return (
    <>
      <header>
        <img className='pokemon' src={Pokeball} alt="Pokéball" />
        <p className='HeaderName'>POKEMON</p>
      </header>
    </>
  )
}

export default Header
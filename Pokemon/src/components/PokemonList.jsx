import { useEffect, useState } from 'react'
import Pokemon from './Pokemon'
import '../css/PokemonList.css'

function PokemonList({ onAddPokemon, disabled = false }) {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((response) => response.json())
            .then((data) => setPokemons(data.results))
    }, [])

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => {
                return (
                    <article className="pokemon-card" key={pokemon.name}>
                        <Pokemon url={pokemon.url} name={pokemon.name} />
                        <div className="pokemon-card__details">
                            <h3>{pokemon.name}</h3>
                            {onAddPokemon && (
                                <button
                                    className="pokemon-card__add"
                                    type="button"
                                    onClick={() => onAddPokemon(pokemon)}
                                    disabled={disabled}
                                >
                                    Toevoegen
                                </button>
                            )}
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default PokemonList

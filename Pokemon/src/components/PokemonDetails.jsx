import { useEffect, useState } from 'react'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
    const [details, setDetails] = useState(null)

    useEffect(() => {
        fetch(pokemon.url)
            .then((response) => response.json())
            .then(setDetails)
    }, [pokemon])

    return (
        <div className="pokemon-details__overlay">
            <section
                className="pokemon-details"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pokemon-details-title"
            >
                <h2 id="pokemon-details-title">{pokemon.name}</h2>
                {details && (
                    <>
                        <img
                            className="pokemon-details__image"
                            src={details.sprites.front_default}
                            alt={pokemon.name}
                        />
                        <p>
                            <strong>Type:</strong>{' '}
                            {details.types.map((type) => type.type.name).join(', ')}
                        </p>
                        <p><strong>Lengte:</strong> {details.height / 10} m</p>
                        <p><strong>Gewicht:</strong> {details.weight / 10} kg</p>
                        <p>
                            <strong>Vaardigheden:</strong>{' '}
                            {details.abilities.map((ability) => ability.ability.name).join(', ')}
                        </p>
                        <h3>Statistieken</h3>
                        <ul className="pokemon-details__stats">
                            {details.stats.map((stat) => (
                                <li key={stat.stat.name}>
                                    <span>{stat.stat.name}</span>
                                    <strong>{stat.base_stat}</strong>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <button
                    className="pokemon-details__close"
                    type="button"
                    onClick={onClose}
                >
                    Terug
                </button>
            </section>
        </div>
    )
}

export default PokemonDetails
